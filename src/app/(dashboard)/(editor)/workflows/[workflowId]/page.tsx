interface Props {
    params: Promise< {
        workflowId: string
    }>
}

const Page = async ({ params }: Props) => {
    const { workflowId } = await params;
    return (
        <div>{workflowId}</div>
    )
}

export const dynamicParams = false;
export default Page
