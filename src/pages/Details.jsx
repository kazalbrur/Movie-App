import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import FeaturedCast from "../components/FeaturedCast"
import Footer from "../components/Footer"
import Images from "../components/Images"
import Movie from "../components/Movie"
import Recommendations from "../components/Recommendations"
import Video from "../components/Video"

function Details() {

    const params = useParams()
    const [showVideo, setShowVideo] = useState(false)
    const videoRef = useRef(null)

    function videoClick() {
        videoRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const recommendations = useSelector((state) => state.recommendationsReducer.recommendations)
    const loading_movie = useSelector((state) => state.movieReducer.loading)

    return (
        <>
            <Movie videoClick={videoClick} id={params.id} showVideo={showVideo} setShowVideo={setShowVideo} />
            <Video ref={videoRef} id={params.id} showVideo={showVideo} setShowVideo={setShowVideo} />
            <FeaturedCast id={params.id} />
            <div className="container">
                <div className="row">
                    {
                        recommendations.length > 0 ?
                            <div className="col-12 col-lg-8 mb-lg-4">
                                <Images id={params.id} />
                            </div>
                            :
                            <div className="col-12 col-lg-8 mb-4">
                                <Images id={params.id} />
                            </div>
                    }

                    <div className="col-12 col-lg-4">
                        <Recommendations id={params.id} setShowVideo={setShowVideo} />
                    </div>
                </div>
            </div>
            {!loading_movie && <Footer />}
        </>
    )
}

export default Details