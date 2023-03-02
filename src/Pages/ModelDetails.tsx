import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Level, LevelsService, ModelInfo, ModelsService, SpacesService } from '../flexapi';
import { Config } from '../flexConfig';
import ModelViewer from '../Components/ModelViewer';
import { CircularProgress } from '@mui/material';


const ModelDetails = () => {
    const [model, setModel] = useState<ModelInfo>({});
    const [levels, setLevels] = useState<Level[]>([]);
    const [levelsLoading, setLevelsLoading] = useState(false);
    const [selectedSpace, selectSpace] = useState<number>();
    const [spacesCount, setSpaceCount] = useState(0);
    const { modelId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchModel = async () => {
            const result = await ModelsService.modelsGetSingleByAssetmodelidAndTenantid({
                tenantId: Config.tenantId,
                region: Config.region,
                assetModelId: Number.parseInt(modelId!)
            }
            );
            setModel(result);
        };
        fetchModel();
    }, [modelId]);

    useEffect(() => {
        const fetchSpaces = async () => {
            const result = await SpacesService.spacesGetByTenantid({
                tenantId: Config.tenantId,
                region: Config.region,
                filter: `AssetModelId eq ${Number.parseInt(modelId!)}`,
                top: 1,
                count: true
            }
            );
            setSpaceCount(result['@odata.count'] || 0);
        };
        fetchSpaces();
    }, [modelId]);

    useEffect(() => {
        const fetchLevels = async () => {
            const result = await LevelsService.levelsGetByTenantid({
                tenantId: Config.tenantId,
                region: Config.region,
                filter: `AssetModelId eq ${Number.parseInt(modelId!)}`,
                expand: 'Spaces($select=Name,Description,EntityId;$orderby=Name)',
                orderby: 'LevelName',
                count: true
            }
            );
            setLevels(result.value!);
            setLevelsLoading(false);
        };
        fetchLevels();
        setLevelsLoading(true);
    }, [modelId]);


    return (
        <div className="container">
            <button className="btn" onClick={() => navigate(-1)}>
                Go Back
            </button>
            <div>
                <div className="title">
                    <h1>{model.Name}</h1>
                </div>
                <div className="flex-split-container">
                    <div className="flex-container">
                        {/* {model.image && (
                    <img src={model.image.url} alt="" className="model-img" />
                )} */}
                        <div className="model-infos">
                            <div className="row">
                                <h3 className="label">Building: </h3>
                                <p className="text">{model.AssetName}</p>
                            </div>
                            <div className="row">
                                <h3 className="label">Model Name: </h3>
                                <p className="text">{model.Name}</p>
                            </div>
                            <div className="row">
                                <h3 className="label">File Size: </h3>
                                <p className="text">{model.ModelSize} bytes</p>
                            </div>
                            <div className="row">
                                <h3 className="label">Number of Rooms: </h3>
                                <p className="text">{spacesCount}</p>
                            </div>
                            <div className="levels">
                                <h3 className="label">Rooms: </h3>
                                {levelsLoading ? <CircularProgress /> : <span />}
                                {levels.filter(l=> l.Spaces?.length! > 0).map((level) => (
                                    <div key={level.EntityId} className="floor-card">
                                        <ul className="floor">
                                            <li>{level.Name}</li>
                                            {level.Spaces!.map((space) => (
                                                <ul key={space.EntityId} className="space">
                                                    <li onClick={() => selectSpace(space.EntityId!)}>{space.Name} : {space.Description}</li>
                                                </ul>
                                            ))}
                                        </ul>
                                    </div>

                                ))}
                            </div>

                        </div>
                    </div>
                    <div className="flex-viewer">
                        <ModelViewer model={model} selectedElement={selectedSpace}></ModelViewer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelDetails;