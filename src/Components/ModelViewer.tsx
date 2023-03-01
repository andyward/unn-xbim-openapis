import { LinearProgress } from "@mui/material";
import React from "react";
import {Viewer, RenderingMode, ViewType,
    NavigationCube, Grid, LoaderOverlay, ViewerLoadedEvent, 
    MessageProgress, MessageType, Message} from '@xbim/viewer';
import { Config } from "../flexConfig";
import { Model, OpenAPI } from "../flexapi";

export interface State {
    height: number,
    width: number,
    renderMode: RenderingMode,
    geometrySet: string,
    highlightColor?: string,
    xrayColor?: string,
    xrayAlpha?: number,
    showNav?: boolean,
    showGrid?: boolean,
    showSpaces?: boolean,
    autoZoom?: boolean,
    tenantId: string,
    baseApi: string,
    accessToken: string,
    loadingProgress?: number
    isLoading: boolean
    isLoaded?: boolean,

    error?: string,
    warning?: string
}

export const initialState: State = {
    height: 200,
    width:300,
    renderMode: RenderingMode.NORMAL,
    geometrySet: 'complete',
    tenantId: "",
    baseApi: "",
    accessToken: "",
    isLoading: false,
    isLoaded: false,
    loadingProgress:0,
    error:''
}

type SampleProps =
{
    model:Model;
}

class ModelViewer extends React.Component<SampleProps,State> {
    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private viewer!: Viewer;
    private navCube!: NavigationCube;
    private grid!: Grid;
    private loaderOverlay!: LoaderOverlay;
    
    constructor(props: SampleProps){
        super(props);

        console.log('constructed', props);
        this.state = initialState;
        this.canvasRef = React.createRef();
        
    }

    getSnapshotBeforeUpdate(prevProps: Readonly<SampleProps>, prevState: Readonly<State>) {
        console.log('getSnapshotBeforeUpdate', prevProps, prevState);
        return null;
    }
    

    public componentDidUpdate(prevProps: Readonly<SampleProps>, prevState: Readonly<State>, snapshot?: any): void {
        console.log('componentDidUpdate', prevProps, prevState, snapshot);
        if(prevProps.model.AssetModelId !== undefined && !prevState.isLoading && !prevState.isLoaded){
            this.loadViewer();
        }
    }

    componentDidMount(): void {
        console.log('componentDidMount');
        
    }

    private loadViewer(): void {
        this.setState({isLoading: true});
        this.viewer = new Viewer(this.canvasRef.current!);
        
        this.setupCube();
        this.setupGrid();
        this.setupOverlay()
        const handleLoaded = (e: ViewerLoadedEvent) => {
            console.log('Model onLoaded - making visible', e);
            //this.modelMap[e.tag] = {loaded:true, wexbimId: e.model, visible: true}
            this.viewer.start();
            this.viewer.show(ViewType.DEFAULT);
            //this.viewer.hoverPickEnabled = true;
            this.loaderOverlay.hide();
            console.log('hide overlay');
            //ReactFlexViewerCard.updateCallback(this.state);
            this.setState({isLoading: false});
        }
        this.viewer.on('loaded', handleLoaded);

        const updateProgress = (message: Message) => {
            var progress = MessageProgress(message);
            if(message.phase === 0) {
                progress = 0;
            }
            //console.log('Progress', message, progress);
            if(message.type === MessageType.COMPLETED) {
                console.log('Model loading completed', message);
                this.setState({isLoaded: true, loadingProgress: 100});
            } else {
                this.setState({loadingProgress: progress});
            }
        }
        let headers: { [name: string]: string; } = 
        { 
            Authorization: 'Bearer '+ OpenAPI.TOKEN
        };
        const model = this.props.model;
        const url = `https://apis.xbim-dev.net/${Config.region}/aim/2.0/${Config.tenantId}/wexbim/complete?assetId=${model.AssetId}&modelId=${model.AssetModelId}`

        
        this.viewer.loadAsync(url, 88256, headers, updateProgress);
        console.log('show overlay');
        //this.loaderOverlay.show();
    }
   

    // getSnapshotBeforeUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>) {
        
    // }

    

    render() {
        console.log('render');
        // const [isLoading, setIsLoading] = useState(true);
        //const [loadingProgress, setIsLoadProgress] = useState(50);
 
        const {loadingProgress, isLoaded} = this.state;
        const width='600px';
        const height = 400;
        const style: React.CSSProperties = { width, height: height-8 };

        return (
            <div className="viewercontainer">
                <canvas ref={this.canvasRef} id="viewer" style={style}></canvas>
                <div className="progress"><LinearProgress variant="determinate" value={loadingProgress} style={{display:isLoaded?"none": "block"}} sx={{height: 8}} /></div>
                <div className="snackbar">
                    {/* <Snackbar open={hasError} autoHideDuration={6000} onClose={resetError} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                        <Alert onClose={resetError} severity="error">{error}</Alert>
                    </Snackbar>
                    <Snackbar open={hasWarning} autoHideDuration={6000} onClose={resetWarning} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                        <Alert onClose={resetWarning} severity="warning">{warning}</Alert>
                    </Snackbar> */}
                </div>
            </div>
            )
    };

    private setupCube() {
        this.navCube = new NavigationCube();
        this.navCube.ratio = 0.05;
        this.navCube.passiveAlpha = this.navCube.activeAlpha = 1.0;
        this.navCube.minSize = 50;
        this.navCube.stopped = true;
        this.viewer.addPlugin(this.navCube);
    }

    private setupGrid() {
        this.grid = new Grid();
        this.grid.zFactor = 20;
        this.grid.colour = [0, 0, 0, 0.8];
        this.grid.stopped = true;
        this.viewer.addPlugin(this.grid);
    }

    private setupOverlay() {
        this.loaderOverlay = new LoaderOverlay();
        this.viewer.addPlugin(this.loaderOverlay);
    }
    
  }

    

export default ModelViewer;