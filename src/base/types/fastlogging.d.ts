declare module 'fastlogging' {
    interface FastLogging {
        info(message: string): void;
        success(message: string): void;
        log(message: string): void;
        warn(message: string): void;
        error(message: string): void;
        debug(message: string): void;
    }

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
