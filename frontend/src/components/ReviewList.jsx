import Review from "./Review"

const ReviewList = ({data}) => {

    const reviews = data?.map(review => <Review comment={review.comment} rating={review.rating} user={review.user}/>)


    return (
        <>
            {reviews}
        </>
    )
}

export default ReviewList