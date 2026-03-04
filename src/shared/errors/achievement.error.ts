export class AchievementError extends Error {
    public readonly statusCode: number;
    public readonly context?: string;

    constructor(message: string, statusCode: number = 500, context?: string) {
        super(message);
        this.name = "AchievementError";
        this.statusCode = statusCode;
        this.context = context;

        // Maintains proper stack trace for where our error was thrown (only available in V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AchievementError);
        }
    }
}