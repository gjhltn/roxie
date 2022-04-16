import { useRouter } from 'next/router'
import useSwr from 'swr'
import { ItemPage as Page } from '/components'
import fetcher from '/helpers/fetcher'

export default function Item() {
	const router = useRouter()
	const { data, error } = useSwr(router.query.id ? `/api/item/${router.query.id}` : null, fetcher)

	if (error) return <div>Failed to load user</div>
	if (!data) return <div>Loading...</div>

	return <Page data={data}/>
}
