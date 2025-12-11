'use client';

import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { headOptions } from '@/shared/const/place';
import { cn } from '@/shared/lib/utils';
import { placeOptions } from '@/views/graph/model/place';
import GwangsanModal from '@/widgets/gwangsan/ui/GwangsanModal';
import { useGetMembers } from '@/widgets/main/model/useGetMembers';
import { useState, useCallback } from 'react';

export default function GwangsanView() {
  const [place, setPlace] = useState<string | undefined>(undefined);
  const [head, setHead] = useState<string>('1');
  const [modal, setModal] = useState(false);
  const [isAdd, setIsAdd] = useState(true);

  const { data, refetch } = useGetMembers();

  const handleAdd = useCallback(() => {
    setIsAdd(true);
    setModal(true);
  }, [setIsAdd, setModal]);

  const handleMinus = useCallback(() => {
    setIsAdd(false);
    setModal(false);
  }, [setIsAdd, setModal]);
  return (
    <div>
      <div className="mobile:gap-[60px] mb-[60px] mt-[90px] flex gap-[24px]">
        <Select value={head} onValueChange={(e) => setHead(e)}>
          <SelectTrigger>
            <SelectValue placeholder="본점을 선택하세요" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {headOptions.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={place} onValueChange={(e) => setPlace(e)}>
          <SelectTrigger>
            <SelectValue placeholder="지점을 선택하세요" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {placeOptions.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 max-h-[600px] overflow-y-auto rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow>
              <TableHead>회원</TableHead>
              <TableHead>광산</TableHead>
              <TableHead>조절</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((member, idx) => (
                <TableRow key={idx}>
                  <TableCell className={cn('whitespace-nowrap')}>
                    <div className={cn('flex flex-col')}>
                      <span>
                        {member.nickname} | <span>{member.name}</span>
                      </span>
                      <span className={cn('text-muted-foreground text-sm')}>
                        {member.phoneNumber}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{member.gwangsan}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button onClick={handleAdd} variant="outline">
                      추가
                    </Button>
                    <Button onClick={handleMinus} variant="outline">
                      차감
                    </Button>
                    <GwangsanModal
                      userId={member.memberId}
                      open={modal}
                      setShow={setModal}
                      isAdd={isAdd}
                      refetch={refetch}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
