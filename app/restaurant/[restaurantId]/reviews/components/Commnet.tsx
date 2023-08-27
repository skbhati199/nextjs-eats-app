import React from 'react'
import { ReviewColumn } from './columns';

interface CellActionProps {
    data: ReviewColumn;
  }
export const Commnet: React.FC<CellActionProps> = ({
    data,
  }) => {
  return (
    <p className='line-clamp-1 max-w-md'>{data.comment}</p>
  )
}
