type Translation = Record<string, string | Record<string, string>>

class I18n {
  private translations: Record<string, Translation> = {}
  private currentLocale: string = 'en'

  constructor(translations: Record<string, Translation>) {
    this.translations = translations
  }

  setLocale(locale: string): void {
    if (this.translations[locale]) {
      this.currentLocale = locale
      document.documentElement.lang = locale
    }
  }

  t(key: string): string {
    const keys = key.split('.')
    let value: any = this.translations[this.currentLocale]

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key
      }
    }

    return typeof value === 'string' ? value : key
  }
}

export const i18n = new I18n({
  en: {
    common: {
      welcome: 'Welcome',
      loading: 'Loading...',
      error: 'An error occurred',
      retry: 'Retry'
    },
    navigation: {
      home: 'Home',
      about: 'About',
      contact: 'Contact'
    },
    accessibility: {
      skipToMain: 'Skip to main content',
      menu: 'Menu',
      closeMenu: 'Close menu'
    }
  },
  de: {
    common: {
      welcome: 'Willkommen',
      loading: 'Laden...',
      error: 'Ein Fehler ist aufgetreten',
      retry: 'Wiederholen'
    },
    navigation: {
      home: 'Startseite',
      about: 'Über uns',
      contact: 'Kontakt'
    },
    accessibility: {
      skipToMain: 'Zum Hauptinhalt springen',
      menu: 'Menü',
      closeMenu: 'Menü schließen'
    }
  }
}) 