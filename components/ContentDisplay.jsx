import { getContentById } from "@/lib/doc";
import Link from "next/link";
import Tag from "./Tag";
const ContentDisplay = async ({ id }) => {
  const content = await getContentById(id);
  //    console.log('object',getContentById(id))
  console.log(content);
  return (
    <div>
      <h2>i am content display : - {id}</h2>
      <h2>{content.title}</h2>
      <span>
        Published On {content.date} By{" "}
        <Link href={`/authors/${content.author}`}>{content.author}</Link>
      </span>
      <h3>Under The <Link href={`/categories/${content.category}`}>{content.category}</Link> Category</h3>

      <div>
        <h2>Tags are ::</h2>
        <h2>--------------</h2>
        {
            content.tags && content.tags.map(tag=><Tag key={tag} tag={tag}/>)
        }
      </div>
      <div  
      dangerouslySetInnerHTML={{__html: content.contentHtml}}
      />
       
      
    </div>
  );
};

export default ContentDisplay;
