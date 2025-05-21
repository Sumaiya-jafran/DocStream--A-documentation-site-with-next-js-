import ContentDisplay from "@/components/ContentDisplay";

const SubContentPage = ({params:{subContentId}}) => {
    // console.log('object',params)

    return (
        <div>
            <ContentDisplay key={subContentId} id={subContentId}/>
            
        </div>
    );
};

export default SubContentPage;