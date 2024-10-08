'use client';

import { useSession } from 'next-auth/react';
import { ChangeEventHandler, FC, useCallback, useState } from 'react';

const RemoveFromSquad: FC<{ id: string; approve: boolean }> = (props) => {
  const session = useSession();
  const [initialValue, setInitialValue] = useState(props.approve);

  const changeState: ChangeEventHandler<HTMLSelectElement> = useCallback(
    async (e) => {
      const value = e.target.value === 'approve';
      setInitialValue(value);
      await fetch(`/api/dashboard/repository/${props.id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approve: value }),
      });
    },
    [props.id]
  );

  // @ts-ignore
  if (!session?.data?.user?.isMod) {
    return <></>;
  }
  return (
    <div>
      <select
        className="bg-black p-[10px] rounded-[10px]"
        onChange={changeState}
      >
        <option value="approve" selected={initialValue}>
          Approve
        </option>
        <option value="disapprove" selected={!initialValue}>
          Disapprove
        </option>
      </select>
    </div>
  );
};

export default RemoveFromSquad;
