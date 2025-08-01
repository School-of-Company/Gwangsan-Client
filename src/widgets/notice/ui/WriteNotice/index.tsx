'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { PLACES } from '@/shared/const/place';
import { cn } from '@/shared/lib/utils';
import { handlePostNotice } from '../../lib/handlePostNotice';
import { storage } from '@/shared/lib/storage';
import { useState, useEffect, useRef } from 'react';
import { uploadImage } from '../../api/uploadImage';

export default function WriteNotice() {
  const roleRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageIds, setImageIds] = useState<number[]>([]);

  useEffect(() => {
    if (roleRef.current) {
      roleRef.current.value = storage.getItem('role') || '';
    }
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const files = Array.from(e.currentTarget.files);
      const uploaded = await uploadImage(files);
      setImageIds(uploaded);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    imageIds.forEach((id) => formData.append('imageIds', id.toString()));
    await handlePostNotice(formData);
    setImageIds([]);
  };

  return (
    <div className={cn('w-full px-16')}>
      <h2 className={cn('text-titleMedium2')}>공지사항 작성</h2>
      <form
        onSubmit={handleSubmit}
        className={cn('mt-[28px] flex flex-col gap-6')}
      >
        <div>
          <label
            htmlFor="title"
            className={cn('mb-1 block text-sm font-medium')}
          >
            제목
          </label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="제목을 입력하세요"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className={cn('mb-1 block text-sm font-medium')}
          >
            내용
          </label>
          <Textarea
            id="content"
            name="content"
            placeholder="내용을 입력하세요"
          />
        </div>
        <div>
          <label className={cn('mb-1 block text-sm font-medium')}>
            대상 지점
          </label>
          <Select name="placeName">
            <SelectTrigger>
              <SelectValue placeholder="대상 지점을 선택해주세요" />
            </SelectTrigger>
            <SelectContent className={cn('w-full bg-white')}>
              <SelectGroup id="placeName">
                {PLACES.map((v) => (
                  <SelectItem
                    className={cn('w-full bg-white')}
                    value={v}
                    key={v}
                  >
                    {v}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="imageIds">첨부 이미지</label>
          <div className="mt-1 flex items-center space-x-2">
            <Input
              ref={fileInputRef}
              onChange={handleImageChange}
              type="file"
              id="imageIds"
              name="imageIds"
              accept="image/*"
              multiple
            />
            <Button
              size="sm"
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              파일첨부
            </Button>
          </div>
        </div>
        <input ref={roleRef} type="hidden" name="role" />
        <Button
          type="submit"
          className={cn('mt-[45px] w-full')}
          variant={'outline'}
        >
          게시하기
        </Button>
      </form>
    </div>
  );
}
