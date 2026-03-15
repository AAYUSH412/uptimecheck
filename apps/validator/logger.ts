type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

function formatLog(level: LogLevel, context: string, message: string): string {
  const ts = new Date().toISOString();
  return `[${ts}] [${level}] [${context}] ${message}`;
}

export function createLogger(context: string) {
  return {
    info: (msg: string) => console.log(formatLog('INFO', context, msg)),
    warn: (msg: string) => console.warn(formatLog('WARN', context, msg)),
    error: (msg: string, err?: unknown) => {
      const detail = err instanceof Error ? ` — ${err.message}` : err != null ? ` — ${String(err)}` : '';
      console.error(formatLog('ERROR', context, msg + detail));
    },
    debug: (msg: string) => {
      if (process.env.NODE_ENV !== 'production') {
        console.debug(formatLog('DEBUG', context, msg));
      }
    },
  };
}

export const logger = createLogger('validator');
