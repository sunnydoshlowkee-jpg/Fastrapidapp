import { useParams } from 'react-router-dom'
import PipelineEditPage from '../../../components/admin/pipeline/PipelineEditPage'
export default function PipelineEdit() { const { itemId } = useParams(); return <PipelineEditPage /> }
