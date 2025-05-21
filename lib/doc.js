import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from 'remark-html';
const postDirectory = path.join(process.cwd(), "docs");

export function getDocument() {
  // console.log(postDirectory);
  const fileNames = fs.readdirSync(postDirectory);
  const allDocuments = fileNames.map((fileName) => {
    // console.log('fileName', fileName);
    const id = fileName.replace(".md", "");
    // console.log(id);
    const fullPath = path.join(postDirectory, fileName);
    // console.log(fullPath);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // console.log(fileContents);
    // console.log(fs.readFileSync(fullPath))

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // console.log(matterResult);
    return {
      id,

      ...matterResult.data,
    };
  });
  return allDocuments.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });
}
export async function  getContentById(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult =  matter(fileContents);
  const processContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
  console.log("object", fileContents);
}
