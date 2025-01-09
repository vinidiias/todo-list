import { useState, useEffect } from "react"
import Loading from "../components/layout/Loading"

function withFetching(Component, url) {
    return function NewComponent(props) {
        const [data, setData] = useState([])
        const [loadingImg, setLoadingImg] = useState(true)
        const [error, setError] = useState(false)

        useEffect(() => {
            fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                auth: props.userData.user_id
              }
            })
            .then((resp) => resp.json())
            .then((Data) => {
              console.log(Data)
              setData(Data)})
            .catch((err) => {
              console.log(err)
              setError(err)
            })
            .finally(setLoadingImg(false))
        }, [props.userData.user_id])            

        return (
          <>
            {loadingImg ? (
              <Loading />
            ) : (
              <Component
                {...props}
                data={data}
                loading={loadingImg}
                error={error}
              />
            )}
          </>
        );
    }
}

export default withFetching