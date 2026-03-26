'use client';

import { useState } from 'react';

import BackHeader from '@/shared/ui/BackHeader';
import { RoleModal, StatusModal } from '@/widgets/main/ui/Modal';
import { useGetMember } from '@/widgets/profile/model/useGetMember';
import Information from '@/widgets/profile/ui/Information';
import { useParams } from 'next/navigation';

export default function ProfileView() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const { data } = useGetMember(id ?? '');

  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  return (
    <div className='flex flex-col justify-center items-center'>
      <BackHeader />
      <div className='max-w-[600px] w-full'>
        <h1 className='text-titleLarge mb-[62px]'>프로필</h1>
        <Information
          data={data}
          onEditRole={() => setRoleModalOpen(true)}
          onEditStatus={() => setStatusModalOpen(true)}
        />
        {data && (
          <>
            <RoleModal
              key={data.memberId}
              open={roleModalOpen}
              setShow={setRoleModalOpen}
              selected={data}
            />
            <StatusModal
              key={`status-${data.memberId}`}
              open={statusModalOpen}
              setShow={setStatusModalOpen}
              selected={data}
            />
          </>
        )}
      </div>
    </div>
  );
}
