import { useParams } from 'react-router-dom'
import PipelineDetailPage from '../../../components/admin/pipeline/PipelineDetailPage'
export default function PipelineDetail() { const { itemId } = useParams(); return <PipelineDetailPage /> }
