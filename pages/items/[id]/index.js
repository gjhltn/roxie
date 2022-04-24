import { useRouter } from 'next/router'
import useSwr from 'swr'
import { ItemPage as Page } from '/components'
import fetcher from '/helpers/fetcher'

export default function Item() {
	const router = useRouter()
	//const id = router.query.id
	const id = 1
	const { data, error } = useSwr(id ? `/api/items/${id}` : null, fetcher)

	if (error) return <div>Error [{JSON.stringify(error)}]</div>
	if (!data) return <div>Loading...</div>

	return <Page data={data} />
}
