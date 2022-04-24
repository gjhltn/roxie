import { useRouter } from 'next/router'
import useSWR from 'swr'
import { ItemEditPage as Page } from '/components'

const fetcher = url => fetch(url).then(r => r.json())

const Update = () => {
	const router = useRouter()
	const { id } = router.query

	const { data, error } = useSWR(`/api/items/${id}`, fetcher)

	if (error) return <div>Error [{JSON.stringify(error)}]</div>
	if (!data) return <div>Loading...</div>

	return <Page data={data} />
}

export default Update
