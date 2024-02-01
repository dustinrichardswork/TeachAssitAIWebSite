
class Config(object):
    DEBUG = True
    TESTING = False

class DevelopmentConfig(Config):
    OPENAI_KEY = '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'

config = {
    'development': DevelopmentConfig,
    'testing': DevelopmentConfig,
    'production': DevelopmentConfig
}