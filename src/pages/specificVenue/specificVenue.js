import React from "react"
import { useParams } from "react-router-dom"
import ApiHook from "../../hooks/apiHook"
import SpecificCard from "../../components/cards/SpecificVenue"

function SpecificVenue() {
    const params = useParams()

    const { data, loading, error } = ApiHook(
        `https://api.noroff.dev/api/v1/holidaze/venues/${params.id}?_owner=true&_bookings=true`
    )
    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>

    return (
        <div>
            <SpecificCard venue={data} venueId={params.id} />
        </div>
    )
}

export default SpecificVenue;