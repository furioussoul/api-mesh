import { useRouterStuff } from '@dub/ui';
import { fetcher } from '@dub/utils';
import { useEffect, useState } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { z } from 'zod';
import { LinkWithTagsProps, UserProps } from '@/types/dub';
import useWorkspace from './use-workspace';

export default function useLinks(
  opts: any = {},
  swrOpts: SWRConfiguration = {},
) {
  const { id: workspaceId } = useWorkspace();
  const { getQueryString } = useRouterStuff();

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (window.location.host.startsWith('admin.')) {
      setAdmin(true);
    }
  }, []);

  const { data: links, isValidating } = useSWR<
    (LinkWithTagsProps & {
      user: UserProps;
    })[]
  >(
    workspaceId
      ? `/api/links${getQueryString(
          {
            workspaceId,
            includeUser: 'true',
            includeWebhooks: 'true',
            ...opts,
          },
          {
            ignore: ['import', 'upgrade', 'newLink'],
          },
        )}`
      : admin
      ? `/api/admin/links${getQueryString(opts)}`
      : null,
    fetcher,
    {
      dedupingInterval: 20000,
      revalidateOnFocus: false,
      keepPreviousData: true,
      ...swrOpts,
    },
  );

  const links_ = [
    {
      id: 'cm2dgfawy000ibbn6mopbrw6h',
      domain: 'dub.sh',
      key: 'asda',
      url: 'https://vercel.com/furioussouls-projects/api-mesh/stores/postgres/store_0UL2LC6hqhSsFlAx/data',
      shortLink: 'https://dub.sh/asda',
      archived: false,
      expiresAt: null,
      expiredUrl: null,
      password: null,
      externalId: null,
      identifier: null,
      trackConversion: false,
      proxy: false,
      title: null,
      description: null,
      image: null,
      video: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      rewrite: false,
      doIndex: false,
      ios: null,
      android: null,
      geo: null,
      userId: 'cm2af6pvz0006tz5ovjyrg8kl',
      projectId: 'cm2af75jq0009tz5ozg0o9vny',
      publicStats: false,
      clicks: 0,
      lastClicked: null,
      leads: 0,
      sales: 0,
      saleAmount: 0,
      createdAt: '2024-10-17T15:27:02.914Z',
      updatedAt: '2024-10-17T15:27:02.914Z',
      comments: 'aa',
      tags: [
        {
          id: 'cm2dgcgw4000hweypuql7ax5p',
          name: 'adasd',
          color: 'yellow',
        },
      ],
      user: {
        id: 'cm2af6pvz0006tz5ovjyrg8kl',
        name: '孙证杰',
        email: 'szj13776197236@163.com',
        emailVerified: null,
        image: 'https://dubassets.com/avatars/cm2af6pvz0006tz5ovjyrg8kl',
        isMachine: false,
        invalidLoginAttempts: 0,
        lockedAt: null,
        createdAt: '2024-10-15T12:29:04.271Z',
        subscribed: true,
        source: null,
        defaultWorkspace: 'da-d-s',
        referredByWorkspaceId: null,
      },
      tagId: 'cm2dgcgw4000hweypuql7ax5p',
      webhookIds: [],
      qrCode: 'https://api.dub.co/qr?url=https://dub.sh/asda?qr=1',
      workspaceId: 'ws_cm2af75jq0009tz5ozg0o9vny',
    },
    {
      id: 'cm2af7h1i000gt7vqns7s93ff',
      domain: 'dub.sh',
      key: 'RzdLav6',
      url: 'https://www.google.com/search?q=producthunter++link+manager&sca_esv=1c1ef98477ec0ce2&sxsrf=ADLYWIILR4fmacA5Erfos2RS1CAPUOgFfQ%3A1728983044515&ei=BDAOZ6KJH5iekPIP2cX2iQE&ved=0ahUKEwiim8Phg5CJAxUYD0QIHdmiPREQ4dUDCA8&uact=5&oq=producthunter++link+manager&gs_lp=Egxnd3Mtd2l6LXNlcnAiG3Byb2R1Y3RodW50ZXIgIGxpbmsgbWFuYWdlcjIKECEYoAEYwwQYCkiKEVC5B1iYEHABeAGQAQCYAZkCoAGUDKoBAzItNrgBA8gBAPgBAZgCAqACggLCAgoQABiwAxjWBBhHmAMAiAYBkAYBkgcFMS4wLjGgB8oO&sclient=gws-wiz-serp',
      shortLink: 'https://dub.sh/RzdLav6',
      archived: false,
      expiresAt: null,
      expiredUrl: null,
      password: null,
      externalId: null,
      identifier: null,
      trackConversion: false,
      proxy: false,
      title: null,
      description: null,
      image: null,
      video: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      rewrite: false,
      doIndex: false,
      ios: null,
      android: null,
      geo: null,
      userId: 'cm2af6pvz0006tz5ovjyrg8kl',
      projectId: 'cm2af75jq0009tz5ozg0o9vny',
      publicStats: false,
      clicks: 0,
      lastClicked: null,
      leads: 0,
      sales: 0,
      saleAmount: 0,
      createdAt: '2024-10-15T12:29:39.462Z',
      updatedAt: '2024-10-15T12:29:39.462Z',
      comments: null,
      tags: [],
      user: {
        id: 'cm2af6pvz0006tz5ovjyrg8kl',
        name: '孙证杰',
        email: 'szj13776197236@163.com',
        emailVerified: null,
        image: 'https://dubassets.com/avatars/cm2af6pvz0006tz5ovjyrg8kl',
        isMachine: false,
        invalidLoginAttempts: 0,
        lockedAt: null,
        createdAt: '2024-10-15T12:29:04.271Z',
        subscribed: true,
        source: null,
        defaultWorkspace: 'da-d-s',
        referredByWorkspaceId: null,
      },
      tagId: null,
      webhookIds: [],
      qrCode: 'https://api.dub.co/qr?url=https://dub.sh/RzdLav6?qr=1',
      workspaceId: 'ws_cm2af75jq0009tz5ozg0o9vny',
    },
  ];

  const isValidating_ = false

  return {
    links: links_,
    isValidating: isValidating_
  };
}
