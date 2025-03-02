module.exports = {
    testEnvironment: "jsdom",
    // Other Jest configurations...
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Adjust this to your folder structure
    },
};
