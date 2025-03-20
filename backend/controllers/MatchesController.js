const express = require("express");
const mongoose = require("mongoose");
const Person = require("../Model/Form");

const router = express.Router();

class MatchesData {
    constructor() {
        this.getMatches = this.getMatches.bind(this); // Bind method to class instance
        this.calculateCompatibility = this.calculateCompatibility.bind(this);
    }

    calculateCompatibility(person1, person2) {
        let score = 0;
        const weights = {
            religion: 20,
            caste: 15,
            subCaste: 10,
            motherTongue: 10,
            professionalDetails: {
                highestEducation: 8,
                occupation: 5,
                annualIncome: 5,
                workLocation: 5,
                state: 3,
                country: 5
            },
            familyDetails: {
                familyStatus: 5,
                familyType: 3,
                familyValues: 5
            },
            mbti: 15
        };

        if (person1.religion === person2.religion) {
            score += weights.religion;
        } else {
            return 0; // Mandatory religion match
        }

        if (person1.caste === person2.caste) {
            score += weights.caste;
        }

        if (person1.subCaste && person2.subCaste && person1.subCaste === person2.subCaste) {
            score += weights.subCaste;
        }

        if (person1.motherTongue === person2.motherTongue) {
            score += weights.motherTongue;
        }

        const professionalFields = ['highestEducation', 'occupation', 'workLocation', 'state', 'country'];
        professionalFields.forEach(field => {
            if (person1.professionalDetails[field] && person2.professionalDetails[field] &&
                person1.professionalDetails[field] === person2.professionalDetails[field]) {
                score += weights.professionalDetails[field];
            }
        });

        const income1 = this.parseIncomeValue(person1.professionalDetails.annualIncome);
        const income2 = this.parseIncomeValue(person2.professionalDetails.annualIncome);

        if (income1 && income2 && Math.abs(income1 - income2) / Math.max(income1, income2) < 0.3) {
            score += weights.professionalDetails.annualIncome;
        }

        const familyFields = ['familyStatus', 'familyType', 'familyValues'];
        familyFields.forEach(field => {
            if (person1.familyDetails[field] && person2.familyDetails[field] &&
                person1.familyDetails[field] === person2.familyDetails[field]) {
                score += weights.familyDetails[field];
            }
        });

        if (person1.Mbti?.res && person2.Mbti?.res) {
            const mbtiScore = this.calculateMbtiCompatibility(person1.Mbti, person2.Mbti);
            score += (mbtiScore * weights.mbti) / 100;
        }
        console.log("score",score)
        return score;
    }

    parseIncomeValue(incomeString) {
        if (!incomeString) return null;
        const numbers = incomeString.match(/\d+/g);
        if (!numbers || numbers.length === 0) return null;
        return numbers.length === 1 ? parseInt(numbers[0]) : (parseInt(numbers[0]) + parseInt(numbers[1])) / 2;
    }

    calculateMbtiCompatibility(mbti1, mbti2) {
        const mbtiCompatibilityMap = {
            "INFJ": ["ENFP", "ENTP", "INFJ", "INFP", "ENFJ"],
            "INTJ": ["ENFP", "ENTP", "INTJ", "INTP", "ENTJ"],
        };

        const type1 = mbti1.res;
        const type2 = mbti2.res;

        if (mbtiCompatibilityMap[type1]?.includes(type2) || mbtiCompatibilityMap[type2]?.includes(type1)) {
            return 80;
        }

        return 40;
    }

    async getMatches(req, res) {
        try {
            const userId = req.params.userId;
            console.log("id", userId);

            const person = await Person.findOne({ userId });
            if (!person) {
                return res.status(404).json({ message: "Profile not found" });
            }

            const personAge = parseInt(person.age);
            const minAgeMatch = personAge - 5;
            const maxAgeMatch = personAge + 5;
            const oppositeGender = person.gender === "Male" ? "Female" : "Male";

            const potentialMatches = await Person.find({
                gender: oppositeGender,
                age: { $gte: minAgeMatch, $lte: maxAgeMatch },
            }).populate('userId', 'email isVerified');

            const scoredMatches = potentialMatches.map(match => {
                const compatibilityScore = this.calculateCompatibility(person, match);
                return {
                    person: match,
                    score: compatibilityScore
                };
            });
            console.log("scoredmatches",scoredMatches)
            scoredMatches.sort((a, b) => b.score - a.score);
            const validMatches = scoredMatches.filter(match => match.score > 0);

            const formattedMatches = validMatches.map(match => ({
                userId: match.person.userId._id,
                _id: match.person._id,
                name: match.person.name,
                age: match.person.age,
                religion: match.person.religion,
                caste: match.person.caste,
                motherTongue: match.person.motherTongue,
                image: match.person.image,
                bio: match.person.bio,
                professionalDetails: match.person.professionalDetails,
                familyDetails: {
                    maritalStatus: match.person.familyDetails.maritalStatus,
                    height: match.person.familyDetails.height,
                    familyType: match.person.familyDetails.familyType
                },
                mbtiType: match.person.Mbti?.res,
                compatibilityScore: Math.round(match.score),
            }));
            console.log(formattedMatches.length)
            return res.status(200).json({
                matches: formattedMatches,
                totalMatches: formattedMatches.length
            });

        } catch (error) {
            console.error("Error finding matches:", error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

module.exports = new MatchesData();
