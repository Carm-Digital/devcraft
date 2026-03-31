export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LoggerOptions {
  scope?: string;
  level?: LogLevel;
  outputFn?: (level: LogLevel, message: string, ...args: unknown[]) => void;
}

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export interface Logger {
  level: LogLevel;
  scope?: string;
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

function defaultOutput(level: LogLevel, message: string, ...args: unknown[]) {
  const ts = new Date().toISOString();

  console[level === "debug" ? "log" : level](
    `[${ts}] [${level.toUpperCase()}] ${message}`,
    ...args,
  );
}

export function createLogger(options: LoggerOptions = {}): Logger {
  const {
    scope,
    level = "info",
    outputFn = defaultOutput,
  } = options;

  const minLevelOrder = LEVEL_ORDER[level];

  const shouldLog = (msgLevel: LogLevel) => LEVEL_ORDER[msgLevel] >= minLevelOrder;

  const formatMessage = (msgLevel: LogLevel, args: unknown[]) => {
    const [first, ...rest] = args;
    const base =
      typeof first === "string"
        ? first
        : first === undefined
          ? ""
          : JSON.stringify(first);

    const prefix = scope ? `[${scope}]` : "";
    const message = prefix ? `${prefix} ${base}` : base;

    return { message, rest };
  };

  const makeFn =
    (msgLevel: LogLevel) =>
    (...args: unknown[]) => {
      if (!shouldLog(msgLevel)) return;

      const { message, rest } = formatMessage(msgLevel, args);
      outputFn(msgLevel, message, ...rest);
    };

  return {
    level,
    scope,
    debug: makeFn("debug"),
    info: makeFn("info"),
    warn: makeFn("warn"),
    error: makeFn("error"),
  };
}

