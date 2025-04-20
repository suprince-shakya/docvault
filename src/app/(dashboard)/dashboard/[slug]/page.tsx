import SlugPage from './_components/slugPage';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	return <SlugPage slug={slug} />;
}
