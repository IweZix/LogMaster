/**
 * FastLogging module to convert js to ts
 */
declare module 'fastlogging' {
    interface FastLogging {
        info(message: string): void;
        success(message: string): void;
        log(message: string): void;
        warn(message: string): void;
        error(message: string): void;
        debug(message: string): void;
    }

    /**
     * FastLogging class
     */
    export default class implements FastLogging {
        constructor(debug?: boolean, toFile?: boolean);
        info(message: string): void;
        success(message: string): void;
        log(message: string): void;
        warn(message: string): void;
        error(message: string): void;
        debug(message: string): void;
    }
}
