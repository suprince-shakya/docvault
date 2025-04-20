import { cn, getFileIcon } from '@/lib/utils';

type Props = {
	type: string;
	extension: string;
	url?: string;
	imageClassName?: string;
	className?: string;
};
export default function Thumbnail({ type, extension, url = '', imageClassName, className }: Props) {
	const isImage = type === 'image' && extension != 'svg';
	return (
		<figure className={cn('rounded-full bg-gray-100', className, 'flex justify-center items-center')}>
			<img
				src={isImage ? `/api/${url}` : getFileIcon(extension, type)}
				alt="thumbnail"
				className={cn('object-cover', imageClassName, isImage && 'rounded-full', !isImage && '!size-12')}
			/>
		</figure>
	);
}
