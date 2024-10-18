export type Link = any;
export type LinkProps = Link;

export type Project = any;
export type Webhook = any;

export interface LinkWithTagsProps extends LinkProps {
  tags: TagProps[];
  webhookIds: string[];
}

export interface SimpleLinkProps {
  domain: string;
  key: string;
  url: string;
}

export interface QRLinkProps {
  domain: string;
  key?: string;
  url?: string;
}

export interface RedisLinkProps {
  id: string;
  url?: string;
  trackConversion?: boolean;
  password?: boolean;
  proxy?: boolean;
  rewrite?: boolean;
  iframeable?: boolean;
  expiresAt?: Date;
  expiredUrl?: string;
  ios?: string;
  android?: string;
  geo?: object;
  doIndex?: boolean;
  projectId?: string;
  webhookIds?: string[];
}

export interface TagProps {
  id: string;
  name: string;
  color: TagColorProps;
}

export type TagColorProps = (typeof tagColors)[number];

export type PlanProps = (typeof plans)[number];

export type RoleProps = (typeof roles)[number];

export type BetaFeatures = 'callink' | 'referrals' | 'webhooks';

export type AddOns = 'conversion' | 'sso';

export interface WorkspaceProps extends Project {
  logo: string | null;
  plan: PlanProps;
  domains: {
    id: string;
    slug: string;
    primary: boolean;
    verified: boolean;
  }[];
  users: {
    role: RoleProps;
  }[];
  flags?: {
    [key in BetaFeatures]: boolean;
  };
}

export type WorkspaceWithUsers = Omit<WorkspaceProps, 'domains'>;

export interface UserProps {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
  source: string | null;
  defaultWorkspace?: string;
  isMachine: boolean;
  hasPassword: boolean;
  provider: string | null;
}

export interface WorkspaceUserProps extends UserProps {
  role: RoleProps;
}

export type DomainVerificationStatusProps =
  | 'Valid Configuration'
  | 'Invalid Configuration'
  | 'Conflicting DNS Records'
  | 'Pending Verification'
  | 'Domain Not Found'
  | 'Unknown Error';

export interface DomainProps {
  id: string;
  slug: string;
  verified: boolean;
  primary: boolean;
  archived: boolean;
  placeholder?: string;
  expiredUrl?: string;
  notFoundUrl?: string;
  projectId: string;
  link?: LinkProps;
  registeredDomain?: RegisteredDomainProps;
}

export interface RegisteredDomainProps {
  id: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface BitlyGroupProps {
  guid: string;
  bsds: string[]; // custom domains
  tags: string[];
}

export interface ImportedDomainCountProps {
  id: number;
  domain: string;
  links: number;
}

export interface SAMLProviderProps {
  name: string;
  logo: string;
  saml: 'okta' | 'azure' | 'google';
  samlModalCopy: string;
  scim: any;
  scimModalCopy: {
    url: string;
    token: string;
  };
}

export type NewLinkProps = any;

type ProcessedLinkOverrides = 'domain' | 'key' | 'url' | 'projectId';
export type ProcessedLinkProps = Omit<NewLinkProps, ProcessedLinkOverrides> &
  Pick<LinkProps, ProcessedLinkOverrides> & { userId?: LinkProps['userId'] } & {
    createdAt?: Date;
    id?: string;
  };

export const plans = [
  'free',
  'pro',
  'business',
  'business plus',
  'business extra',
  'business max',
  'enterprise',
] as const;

export const roles = ['owner', 'member'] as const;

export type Role = (typeof roles)[number];

export const tagColors = [
  'red',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'brown',
] as const;

export type MetaTag = any;

export type TokenProps = any;

export type OAuthAppProps = any;

export type NewOAuthApp = any;

export type ExistingOAuthApp = OAuthAppProps;

export type IntegrationProps = any;

export type NewOrExistingIntegration = Omit<
  IntegrationProps,
  'id' | 'verified' | 'installations'
> & {
  id?: string;
};

export type InstalledIntegrationProps = Pick<
  IntegrationProps,
  'id' | 'slug' | 'logo' | 'name' | 'developer' | 'description' | 'verified'
> & {
  installations: number;
  installed?: boolean;
};

export type InstalledIntegrationInfoProps = Pick<
  IntegrationProps,
  | 'id'
  | 'slug'
  | 'logo'
  | 'name'
  | 'developer'
  | 'description'
  | 'verified'
  | 'readme'
  | 'website'
  | 'screenshots'
  | 'installUrl'
> & {
  createdAt: Date;
  installations: number;
  installed: {
    id: string;
    createdAt: Date;
    by: {
      id: string;
      name: string | null;
      image: string | null;
    };
  } | null;
};

export type WebhookTrigger = any;

export type WebhookProps = any;

export type NewWebhook = any;

export type WebhookEventProps = any;

export type WebhookCacheProps = Pick<
  Webhook,
  'id' | 'url' | 'secret' | 'triggers'
>;

export type TrackCustomerResponse = any;

export type TrackLeadResponse = any;

export type TrackSaleResponse = any;



export const INTERVAL_DATA: Record<
  string,
  {
    startDate: Date;
    granularity: "minute" | "hour" | "day" | "month";
  }
> = {
  "24h": {
    startDate: new Date(Date.now() - 86400000),
    granularity: "hour",
  },
  "7d": {
    startDate: new Date(Date.now() - 604800000),
    granularity: "day",
  },
  "30d": {
    startDate: new Date(Date.now() - 2592000000),
    granularity: "day",
  },
  "90d": {
    startDate: new Date(Date.now() - 7776000000),
    granularity: "day",
  },
  ytd: {
    startDate: new Date(new Date().getFullYear(), 0, 1),
    granularity: "month",
  },
  "1y": {
    startDate: new Date(Date.now() - 31556952000),
    granularity: "month",
  },
  all: {
    // Dub.co founding date
    startDate: new Date(Date.now()),
    granularity: "month",
  },
};


export const INTERVAL_DISPLAYS = [
  {
    display: "Last 24 hours",
    value: "24h",
    shortcut: "d",
  },
  {
    display: "Last 7 days",
    value: "7d",
    shortcut: "w",
  },
  {
    display: "Last 30 days",
    value: "30d",
    shortcut: "m",
  },
  {
    display: "Last 3 months",
    value: "90d",
    shortcut: "t",
  },
  {
    display: "Year to Date",
    value: "ytd",
    shortcut: "y",
  },
  {
    display: "Last 12 months",
    value: "1y",
    shortcut: "l",
  },
  {
    display: "All Time",
    value: "all",
    shortcut: "a",
  },
];