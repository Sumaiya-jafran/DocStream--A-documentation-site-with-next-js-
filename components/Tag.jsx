import Link from 'next/link';

const Tag = ({tag}) => {
    return (
        <div>
            <Link href={`/tag/${tag}`}>{tag}</Link>
        </div>
    );
};

export default Tag;