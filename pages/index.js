import useSwr from 'swr'
import fetcher from '../helpers/fetcher'
import { ListingPage } from '../components'

export default function Index() {
	const { data, error } = useSwr('/api/items', fetcher)

	if (error) return <div>Failed to load items</div>
	if (!data) return <div>Loading...</div>

	return <ListingPage data={data} />
}
