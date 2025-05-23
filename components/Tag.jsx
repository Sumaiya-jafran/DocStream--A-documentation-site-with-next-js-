import Link from 'next/link';

const Tag = ({tag}) => {
    return (
        <div>
            <Link href={`/tags/${tag}`}>{tag}</Link>
        </div>
    );
};

export default Tag;