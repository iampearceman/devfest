import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Button } from '@frontend/components/button';
import { events } from '@frontend/utils/events';
import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

const DateComponent = dynamic(
  () => import('@frontend/components/utils/date.component'),
  {
    ssr: false,
  }
);

const HideEvent = dynamic(() => import('@frontend/utils/hide.event'), {
  ssr: false,
});

const Event: FC<{
  event: {
    date: string;
    name: string;
    company: string;
    url: string;
    id: number;
  };
}> = (props) => {
  const { event } = props;
  return (
    <div
      className={clsx(
        'relative w-[900px] md:w-[1360px] flex justify-between items-center gap-[28.5px] md:gap-[74px] bg-[#191919] px-5 py-4 md:px-8 md:py-6 rounded-lg md:rounded-xl text-[16px] leading-[19.2px] md:text-[20px] md:leading-[24px]'
      )}
    >
      <HideEvent date={event.date} />
      <p className="min-w-[60px] max-w-[60px] md:min-w-[100px] md:max-w-[100px]">
        <DateComponent date={event.date} format="DD/MM/YYYY" />
      </p>
      <p className="min-w-[80px] max-w-[80px] md:min-w-[100px] md:max-w-[100px]">
        <DateComponent date={event.date} format="HH:mm" />
      </p>
      <p className="min-w-[360px] max-w-[360px] md:min-w-[500px] md:max-w-[500px]">
        {event.name}
      </p>
      <p className="min-w-[160px] max-w-[160px] md:min-w-[200px] md:max-w-[200px] ">
        {event.company}
      </p>
      <Button
        size="sm"
        className="min-w-[86px] max-w-[86px] md:min-w-[100px] md:max-w-[100px]"
        type="button"
        onClick={() => window.open(event.url, '_blank')}
      >
        RSVP
      </Button>
    </div>
  );
};
const Events = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <section id="events">
      <div className="w-full space-y-6 md:space-y-8">
        <h6>[ Welcome to DevFest AI ]</h6>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5">
          <h2 className="max-w-[760px] text-left">
            Join our
            <span className="text-purple"> Exciting Events </span>
            Over the month!
          </h2>
        </div>
      </div>

      <div className="w-full space-y-3 overflow-x-auto scrollbar">
        <div className="w-[900px] md:w-[1360px] p-px bg-gradient-to-r from-[#8248FF] to-[#FFFFFF33] rounded-lg md:rounded-xl">
          <div className="flex justify-between gap-[28.5px] md:gap-[74px] bg-gradient-to-bl from-[#8562FD] to-[#302068] px-5 py-4 md:px-8 md:py-6 rounded-lg md:rounded-xl text-[20px] leading-[20px] md:text-[24px] md:leading-[24px] font-bebas uppercase">
            <p className="min-w-[60px] max-w-[60px] md:min-w-[100px] md:max-w-[100px]">
              Date
            </p>
            <p className="min-w-[80px] max-w-[80px] md:min-w-[100px] md:max-w-[100px]">
              Time
            </p>
            <p className="min-w-[360px] max-w-[360px] md:min-w-[500px] md:max-w-[500px]">
              Event
            </p>
            <p className="min-w-[160px] max-w-[160px] md:min-w-[200px] md:max-w-[200px]">
              Company
            </p>
            <p className="min-w-[86px] max-w-[86px] md:min-w-[100px] md:max-w-[100px]">
              RSVP
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {events.map((event, idx) => (
            <Event key={idx} event={event} />
          ))}
        </div>
      </div>

      <Button
        icon="arrow-up-right"
        className="w-fit"
        onClick={() => {
          if (session.status === 'authenticated') {
            return router.push('/dashboard');
          }
          return signIn('github', {
            callbackUrl: '/dashboard',
            redirect: true,
          });
        }}
      >
        {session.status === 'authenticated'
          ? 'Your team'
          : 'Sign up with GitHub'}
      </Button>
    </section>
  );
};

export default Events;
