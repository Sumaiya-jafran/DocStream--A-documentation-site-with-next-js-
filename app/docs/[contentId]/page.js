import ContentDisplay from "@/components/ContentDisplay";

const ContentPage = ({params:{contentId}}) => {
    // console.log('object',params)
    return (
        <div>
           <ContentDisplay id={contentId}/>
        </div>
    );
};

export default ContentPage;