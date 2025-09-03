export default {
    extends: ["@commitlint/cli", "@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat",
                "fix",
                "docs",
                "style",
                "refactor",
                "perf",
                "test",
                "build",
                "ci",
                "chore",
                "revert",
                "serverdown"
            ]
        ],
        "subject-case": [2, "always", "sentence-case"]
    }
};
