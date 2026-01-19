import logging
import logging.config
from typing import Any, Dict

import structlog
from structlog import dev

from app.core.config import get_settings


def _base_logging_dict(level: str) -> Dict[str, Any]:
    return {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "structured": {
                "()": structlog.stdlib.ProcessorFormatter,
                "processor": dev.ConsoleRenderer(),
                "foreign_pre_chain": [
                    structlog.processors.TimeStamper(fmt="iso"),
                    structlog.processors.add_log_level,
                ],
            }
        },
        "handlers": {
            "default": {
                "level": level,
                "class": "logging.StreamHandler",
                "formatter": "structured",
            }
        },
        "root": {"handlers": ["default"], "level": level},
    }


def configure_logging() -> None:
    settings = get_settings()
    logging.config.dictConfig(_base_logging_dict(settings.log_level))
    structlog.configure(
        processors=[
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.add_log_level,
            structlog.processors.StackInfoRenderer(),
            structlog.processors.format_exc_info,
            structlog.stdlib.ProcessorFormatter.wrap_for_formatter,
        ],
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )

