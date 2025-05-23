export default async function CategoryPage({ params }) {
  const { name } = params;
  return <div>{name}</div>;
}
