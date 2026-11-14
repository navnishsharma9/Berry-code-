const KNOWN_REGISTERED_PROVIDERS = new Set([
  // Google
  'gmail.com',
  'googlemail.com',
  'google.com',
  // Microsoft
  'outlook.com',
  'outlook.co.uk',
  'outlook.in',
  'outlook.de',
  'outlook.fr',
  'hotmail.com',
  'hotmail.co.uk',
  'hotmail.fr',
  'hotmail.de',
  'live.com',
  'live.co.uk',
  'msn.com',
  // Yahoo
  'yahoo.com',
  'yahoo.co.uk',
  'yahoo.co.in',
  'yahoo.ca',
  'yahoo.de',
  'yahoo.fr',
  'yahoo.co.jp',
  'ymail.com',
  'rocketmail.com',
  // Apple
  'icloud.com',
  'me.com',
  'mac.com',
  // Privacy & major webmail providers
  'proton.me',
  'protonmail.com',
  'protonmail.ch',
  'pm.me',
  'tutanota.com',
  'tuta.io',
  'tuta.com',
  'fastmail.com',
  'fastmail.fm',
  'zoho.com',
  'zohomail.com',
  'aol.com',
  'gmx.com',
  'gmx.de',
  'gmx.net',
  'mail.com',
  'yandex.com',
  'yandex.ru',
  'hey.com',
  'duck.com',
  'rediffmail.com',
  'qq.com',
  '163.com',
  '126.com',
  'web.de',
  't-online.de',
  'orange.fr',
  'comcast.net',
  'verizon.net',
  'att.net',
  'sbcglobal.net',
  'btinternet.com',
]);

const DOMAIN_TYPO_SUGGESTIONS = {
  'gmial.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.om': 'gmail.com',
  'gmail.comm': 'gmail.com',
  'gmail.cim': 'gmail.com',
  'outlok.com': 'outlook.com',
  'outllok.com': 'outlook.com',
  'outloook.com': 'outlook.com',
  'outlook.co': 'outlook.com',
  'outlook.cm': 'outlook.com',
  'outlook.con': 'outlook.com',
  'hotmal.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmaill.com': 'hotmail.com',
  'hotmail.co': 'hotmail.com',
  'hotmail.con': 'hotmail.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'yhoo.com': 'yahoo.com',
  'yaoo.com': 'yahoo.com',
  'yahoo.co': 'yahoo.com',
  'yahoo.con': 'yahoo.com',
  'yahoo.cm': 'yahoo.com',
  'iclod.com': 'icloud.com',
  'icoud.com': 'icloud.com',
  'icluod.com': 'icloud.com',
  'icloud.co': 'icloud.com',
  'icloud.con': 'icloud.com',
  'protonmal.com': 'protonmail.com',
  'protonmail.co': 'protonmail.com',
  'protonmail.con': 'protonmail.com',
};

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'mailinator.net',
  'mailinator.org',
  'mailinator2.com',
  'binkmail.com',
  'bobmail.info',
  'chammy.info',
  'devnullmail.com',
  'letthemeatspam.com',
  'reallymymail.com',
  'reconmail.com',
  'safetymail.info',
  'sogetthis.com',
  'spambooger.com',
  'spamherelots.com',
  'spamhereplease.com',
  'spamthisplease.com',
  'suremail.info',
  'thisisnotmyrealemail.com',
  'tradermail.info',
  'veryrealemail.com',
  'zippymail.info',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamail.biz',
  'guerrillamail.de',
  'guerrillamail.info',
  'guerrillamailblock.com',
  'sharklasers.com',
  'grr.la',
  'pokemail.net',
  'spam4.me',
  '10minutemail.com',
  '10minutemail.net',
  '10minutemail.org',
  '10minutemail.co.uk',
  '10minutemail.de',
  '10minemail.com',
  '10mail.org',
  '20minutemail.com',
  '20mail.it',
  '30minutemail.com',
  'tempmail.com',
  'tempmail.net',
  'tempmail.org',
  'tempmail.dev',
  'tempmail.plus',
  'tempmailo.com',
  'tempmailaddress.com',
  'temp-mail.org',
  'temp-mail.io',
  'temp-mail.ru',
  'temp-mail.de',
  'tempail.com',
  'tempr.email',
  'tempinbox.com',
  'temporary-mail.net',
  'temporarymail.com',
  'temporaryemail.net',
  'tmpmail.org',
  'tmpmail.net',
  'tmpmail.com',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
  'throwawaymail.com',
  'throwaway.email',
  'trashmail.com',
  'trashmail.net',
  'trashmail.org',
  'trashmail.de',
  'trashmail.me',
  'trash-mail.com',
  'trashymail.com',
  'trashinbox.com',
  'wegwerfmail.de',
  'wegwerfmail.net',
  'wegwerfmail.org',
  'maildrop.cc',
  'mailnesia.com',
  'getnada.com',
  'nada.email',
  'nada.ltd',
  'inboxbear.com',
  'dispostable.com',
  'mintemail.com',
  'mytemp.email',
  'mohmal.com',
  'moakt.com',
  'burnermail.io',
  'fakemail.net',
  'fakemailgenerator.com',
  'emailfake.com',
  'emailondeck.com',
  'mailcatch.com',
  'meltmail.com',
  'harakirimail.com',
  'discard.email',
  'spambog.com',
  'spambog.de',
  'spambog.ru',
  'spambox.us',
  'spamgourmet.com',
  'spamfree24.org',
  'incognitomail.org',
  'instant-mail.de',
  'dropmail.me',
  'crazymailing.com',
  'deadaddress.com',
  'dodgeit.com',
  'dodgit.com',
  'e4ward.com',
  'filzmail.com',
  'getairmail.com',
  'hidemail.de',
  'kasmail.com',
  'mailexpire.com',
  'mailforspam.com',
  'mailin8r.com',
  'mailmetrash.com',
  'mailnull.com',
  'mailshell.com',
  'mailzilla.com',
  'nowmymail.com',
  'oneoffemail.com',
  'pookmail.com',
  'proxymail.eu',
  'rejectmail.com',
  'shortmail.net',
  'sneakemail.com',
  'snkmail.com',
  'spam.la',
  'spamavert.com',
  'spamcowboy.com',
  'spamex.com',
  'spammotel.com',
  'tempomail.fr',
  'tmailinator.com',
  'whyspam.me',
  'willselfdestruct.com',
  'anonbox.net',
  'mail.tm',
  'mail.gw',
  'generator.email',
  'cuvox.de',
  'armyspy.com',
  'dayrep.com',
  'einrot.com',
  'fleckens.hu',
  'gustr.com',
  'jourrapide.com',
  'rhyta.com',
  'superrito.com',
  'teleworm.us',
  'linshiyouxiang.net',
  'bccto.me',
  'chacuo.net',
]);

const DISPOSABLE_KEYWORD_FRAGMENTS = [
  'tempmail',
  'temp-mail',
  'throwaway',
  'trashmail',
  'disposable',
  'fakeemail',
  'fakemail',
  'burnermail',
  'guerrillamail',
  '10minutemail',
  'mailinator',
  'yopmail',
  'spambox',
  'mintemail',
];

const PLACEHOLDER_OR_TEST_DOMAINS = new Set([
  'example.com',
  'example.org',
  'example.net',
  'example.edu',
  'test.com',
  'test.org',
  'test.net',
  'testing.com',
  'sample.com',
  'demo.com',
  'dummy.com',
  'fake.com',
  'temp.com',
  'placeholder.com',
  'domain.com',
  'yourdomain.com',
  'yourcompany.com',
  'company.com',
  'website.com',
  'yoursite.com',
  'email.com',
  'noemail.com',
  'noreply.com',
  'donotreply.com',
  'nomail.com',
  'none.com',
  'null.com',
  'void.com',
  'invalid.com',
  'localhost.com',
  'foo.com',
  'bar.com',
  'baz.com',
  'asdf.com',
  'asdf.org',
  'asdf.net',
  'qwerty.com',
  'zxcv.com',
  'abc.com',
  'abcd.com',
  'xyz.com',
  '123.com',
  '1234.com',
  'random.com',
]);

const RESERVED_OR_SPAM_TLDS = new Set([
  'test',
  'example',
  'invalid',
  'local',
  'localhost',
  'lan',
  'home',
  'internal',
  'corp',
  'arpa',
  'onion',
  'tk',
  'ml',
  'ga',
  'cf',
  'gq',
  'xyz',
  'top',
  'click',
  'loan',
  'buzz',
  'party',
  'racing',
  'win',
  'bid',
  'stream',
  'download',
]);

const KNOWN_SHORT_BUSINESS_DOMAINS = new Set([
  'hp.com',
  'lg.com',
  'ge.com',
  'gm.com',
  '3m.com',
  'bt.com',
  'ti.com',
  'st.com',
  'ibm.com',
  'arm.com',
  'amd.com',
  'nxp.com',
  'tsmc.com',
  'hpe.com',
  'sap.com',
  'dhl.com',
  'ups.com',
  'jbl.com',
  'htc.com',
  'kpmg.com',
  'pwc.com',
  'mit.edu',
]);

const KEYBOARD_WALK_PATTERNS = [
  'qwerty',
  'qwert',
  'asdf',
  'sdfg',
  'dfgh',
  'fghj',
  'ghjk',
  'hjkl',
  'zxcv',
  'xcvb',
  'cvbn',
  'qazwsx',
  'poiuy',
  'lkjhg',
  'mnbvc',
  '12345',
  '23456',
  '34567',
  '45678',
  '56789',
  'abcdef',
];

function isDisposableDomain(domain) {
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) return true;

  for (const tempDomain of DISPOSABLE_EMAIL_DOMAINS) {
    if (domain.endsWith(`.${tempDomain}`)) return true;
  }

  return DISPOSABLE_KEYWORD_FRAGMENTS.some((fragment) => domain.includes(fragment));
}

function isLikelyRandomOrGibberishDomain(domain) {
  if (KNOWN_SHORT_BUSINESS_DOMAINS.has(domain)) return false;

  const parts = domain.split('.');
  const tld = parts[parts.length - 1];

  if (RESERVED_OR_SPAM_TLDS.has(tld)) return true;

  const secondLevelDomains = new Set(['co', 'com', 'org', 'net', 'edu', 'gov', 'ac']);
  const primaryIndex =
    parts.length >= 3 && secondLevelDomains.has(parts[parts.length - 2]) && tld.length === 2
      ? parts.length - 3
      : parts.length - 2;
  const primaryLabel = parts[primaryIndex] ?? parts[0];

  if (!primaryLabel || primaryLabel.length < 3) return true;
  if (/^\d+$/.test(primaryLabel) || /\d{3,}$/.test(primaryLabel)) return true;

  const tokens = primaryLabel.split('-').filter(Boolean);
  if (tokens.length === 0) return true;

  for (const token of tokens) {
    if (token.length < 2) return true;
    if (/(.)\1{2,}/.test(token)) return true;
    if (KEYBOARD_WALK_PATTERNS.some((walk) => token.includes(walk))) return true;
    if (/^([a-z0-9]{2,3})\1{1,}$/.test(token)) return true;
    if (token.length >= 4 && !/[aeiouy]/.test(token)) return true;
    if (/[bcdfghjklmnpqrstvwxz]{6,}/.test(token)) return true;
  }

  return false;
}

export function validateSubscriptionEmail(rawEmail) {
  const trimmed = String(rawEmail || '').trim();

  if (!trimmed) {
    return {
      valid: false,
      normalizedEmail: '',
      error: 'Please enter your email address.',
    };
  }

  if (/\s/.test(trimmed)) {
    return {
      valid: false,
      normalizedEmail: trimmed,
      error: 'Email addresses cannot contain spaces.',
    };
  }

  const atParts = trimmed.split('@');
  if (atParts.length !== 2 || !atParts[0] || !atParts[1]) {
    return {
      valid: false,
      normalizedEmail: trimmed,
      error: 'Please enter a valid email address (e.g. name@gmail.com).',
    };
  }

  const [localPart, rawDomain] = atParts;
  const domain = rawDomain.toLowerCase();
  const normalizedEmail = `${localPart}@${domain}`;

  const localValid =
    localPart.length <= 64 &&
    !localPart.startsWith('.') &&
    !localPart.endsWith('.') &&
    !localPart.includes('..') &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart);

  const domainLabels = domain.split('.');
  const tld = domainLabels[domainLabels.length - 1] ?? '';
  const domainValid =
    domain.length <= 253 &&
    domainLabels.length >= 2 &&
    domainLabels.every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label)) &&
    /^[a-z]{2,24}$/.test(tld);

  if (!localValid || !domainValid) {
    return {
      valid: false,
      normalizedEmail,
      error: 'Please enter a valid email address (e.g. name@gmail.com).',
    };
  }

  if (DOMAIN_TYPO_SUGGESTIONS[domain]) {
    return {
      valid: false,
      normalizedEmail,
      error: `Domain "${domain}" appears misspelled. Did you mean @${DOMAIN_TYPO_SUGGESTIONS[domain]}?`,
    };
  }

  if (isDisposableDomain(domain)) {
    return {
      valid: false,
      normalizedEmail,
      error:
        'Temporary or disposable email addresses are not accepted. Please use Gmail, Outlook, Yahoo, or a valid business email.',
    };
  }

  if (KNOWN_REGISTERED_PROVIDERS.has(domain)) {
    return {
      valid: true,
      normalizedEmail,
    };
  }

  if (PLACEHOLDER_OR_TEST_DOMAINS.has(domain)) {
    return {
      valid: false,
      normalizedEmail,
      error:
        'Please enter a real registered personal or business email rather than a test or placeholder domain.',
    };
  }

  if (isLikelyRandomOrGibberishDomain(domain)) {
    return {
      valid: false,
      normalizedEmail,
      error:
        'Please enter a valid registered email domain (such as Gmail, Outlook, Yahoo, or a verified business email).',
    };
  }

  return {
    valid: true,
    normalizedEmail,
  };
}
