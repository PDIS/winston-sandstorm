// Type definitions for winston 3.0
// Project: https://github.com/winstonjs/winston

/// <reference types="node" />

import * as stream from "stream";

import * as logform from 'logform';
import * as Transport from 'winston-transport';

import * as Config from './lib/winston/config/index';
import * as Transports from './lib/winston/transports/index';

declare namespace winston {
  // Hoisted namespaces from other modules
  export import format = logform.format;
  export import config = Config;
  export import transports = Transports;

  interface ExceptionHandler {
    logger: Logger;
    handlers: Map<any, any>;
    catcher: Function | boolean;

    handle(...transports: Transport[]): void;
    unhandle(...transports: Transport[]): void;
    getAllInfo(err: string | Error): object;
    getProcessInfo(): object;
    getOsInfo(): object;
    getTrace(err: Error): object;

    new(logger: Logger): ExceptionHandler;
  }

  interface QueryOptions {
    rows?: number;
    limit?: number;
    start?: number;
    from?: Date;
    until?: Date;
    order?: "asc" | "desc";
    fields: any;
  }

  interface Profiler {
    logger: Logger;
    start: Date;
    done(): boolean;
  }

  type LogCallback = (error?: any, level?: string, message?: string, meta?: any) => void;

  interface LogEntry {
    level: string;
    message: string;
    [optionName: string]: any;
  }

  interface LogMethod {
    (level: string, message: string, callback: LogCallback): Logger;
    (level: string, message: string, meta: any, callback: LogCallback): Logger;
    (level: string, message: string, ...meta: any[]): Logger;
    (entry: LogEntry): Logger;
  }

  interface LeveledLogMethod {
    (message: string, callback: LogCallback): Logger;
    (message: string, meta: any, callback: LogCallback): Logger;
    (message: string, ...meta: any[]): Logger;
    (infoObject: object): Logger;
  }

  interface LoggerOptions {
    levels?: Config.AbstractConfigSetLevels;
    silent?: boolean;
    format?: logform.Format;
    level?: string;
    exitOnError?: Function | boolean;
    transports?: Transport[] | Transport;
    exceptionHandlers?: any;
  }

  interface Logger extends stream.Transform {
    silent: boolean;
    format: logform.Format;
    levels: Config.AbstractConfigSetLevels;
    level: string;
    transports: Transport[];
    exceptions: ExceptionHandler;
    profilers: object;
    exitOnError: Function | boolean;

    log: LogMethod;
    add(transport: Transport): Logger;
    remove(transport: Transport): Logger;
    clear(): Logger;
    close(): Logger;

    // for cli and npm levels
    error: LeveledLogMethod;
    warn: LeveledLogMethod;
    help: LeveledLogMethod;
    data: LeveledLogMethod;
    info: LeveledLogMethod;
    debug: LeveledLogMethod;
    prompt: LeveledLogMethod;
    http: LeveledLogMethod;
    verbose: LeveledLogMethod;
    input: LeveledLogMethod;
    silly: LeveledLogMethod;

    // for syslog levels only
    emerg: LeveledLogMethod;
    alert: LeveledLogMethod;
    crit: LeveledLogMethod;
    warning: LeveledLogMethod;
    notice: LeveledLogMethod;

    query(options?: QueryOptions, callback?: (err: Error, results: any) => void): any;
    stream(options?: any): NodeJS.ReadableStream;

    startTimer(): Profiler;
    profile(id: string | number): Logger;

    configure(options: LoggerOptions): void;

    new(options?: LoggerOptions): Logger;
  }

  interface Container {
    loggers: Map<string, Logger>;
    options: LoggerOptions;

    add(id: string, options?: LoggerOptions): Logger;
    get(id: string, options?: LoggerOptions): Logger;
    has(id: string): boolean;
    close(id?: string): void;

    new(options?: LoggerOptions): Container;
  }

  let version: string;
  let ExceptionHandler: ExceptionHandler;
  let Container: Container;
  let loggers: Container;

  let addColors: (target: Config.AbstractConfigSetColors) => any;
  let createLogger: (options?: LoggerOptions) => Logger;

  // Pass-through npm level methods routed to the default logger.
  let error: LeveledLogMethod;
  let warn: LeveledLogMethod;
  let info: LeveledLogMethod;
  let http: LeveledLogMethod;
  let verbose: LeveledLogMethod;
  let debug: LeveledLogMethod;
  let silly: LeveledLogMethod;

  // Other pass-through methods routed to the default logger.
  let log: LogMethod;
  let query: (options?: QueryOptions, callback?: (err: Error, results: any) => void) => any;
  let stream: (options?: any) => NodeJS.ReadableStream;
  let add: (transport: Transport) => Logger;
  let remove: (transport: Transport) => Logger;
  let clear: () => Logger;
  let startTimer: () => Profiler;
  let profile: (id: string | number) => Logger;
  let configure: (options: LoggerOptions) => void;
  let level: string;
  let exceptions: ExceptionHandler;
  let exitOnError: Function | boolean;
  // let default: object;
}

export = winston;