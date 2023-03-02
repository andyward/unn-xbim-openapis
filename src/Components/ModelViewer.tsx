import React from "react";
import {Viewer, RenderingMode, ViewType,
    NavigationCube, Grid, LoaderOverlay, ViewerLoadedEvent, 
    MessageProgress, MessageType, Message, ProductType, State as EntityState} from '@xbim/viewer';
import { LinearProgress } from "@mui/material";
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
    loadingProgress?: number
    isLoading: boolean
    isLoaded?: boolean,
    selectedElement?: number,

    error?: string,
    warning?: string
}

export const initialState: State = {
    height: 400,
    width: 600,
    renderMode: RenderingMode.NORMAL,
    highlightColor: '#00ff00ff',
    xrayColor: '#ffffff05',
    geometrySet: 'complete',
    selectedElement: undefined,
    isLoading: false,
    isLoaded: false,
    loadingProgress:0,
    error:''
}

type ViewerProps = {
    model: Model;
    selectedElement?: number;
}

class ModelViewer extends React.Component<ViewerProps,State> {
    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private viewer!: Viewer;
    private navCube!: NavigationCube;
    private grid!: Grid;
    private loaderOverlay!: LoaderOverlay;
    
    constructor(props: ViewerProps){
        super(props);

        this.state = initialState;
        // Get reference to canvas
        this.canvasRef = React.createRef();
    }

    public componentDidUpdate(prevProps: Readonly<ViewerProps>, prevState: Readonly<State>, snapshot?: any): void {
        console.log('componentDidUpdate',this.state, prevProps, prevState, snapshot);
        if(prevProps.model.AssetModelId !== undefined && !prevState.isLoading && !prevState.isLoaded){
            this.loadViewer();
        }
        if(this.viewer) {
            if(this.state.isLoaded) {
                // update the state
                
                this.navCube.stopped = !this.state.showNav;
                this.grid.stopped = !this.state.showGrid;
                this.viewer.renderingMode = this.state.renderMode;
                this.viewer.highlightingColour = this.convertHexRgb(this.state.highlightColor);
                //this.viewer.xrayColour = this.convertHexRgb(this.state.xrayColor, this.state.xrayAlpha);
                //this.viewer.defineStyle(224, this.viewer.xrayColour);
                //this.viewer.setStyle(224, ProductType.IFCSPACE);
                if(this.state.showSpaces){
                    this.viewer.setState(EntityState.UNDEFINED, ProductType.IFCSPACE);
                }
                else {
                    this.viewer.setState(EntityState.HIDDEN, ProductType.IFCSPACE);
                }
                
                this.highlightEntities();
            }
        }
    }

    highlightEntities() {
        if(this.state.selectedElement === undefined){
            //this.viewer.resetState(null!, null!);
            return;
        }
        // Put into xray mode, make Spaces visible via custom style
        this.viewer.resetState(null!, null!);
        this.viewer.defineStyle(1, [255,0,0,255]);
        this.viewer.renderingMode = RenderingMode.XRAY_ULTRA;
        this.viewer.setStyle(1,[this.state.selectedElement]);
        this.viewer.setState(EntityState.XRAYVISIBLE,[this.state.selectedElement]);
        if(this.state.autoZoom)
            this.viewer.zoomTo(this.state.selectedElement, undefined, true);
    }

    public componentWillUnmount() {
       
        // this.viewer.off('loaded', this.handleLoaded);
        // this.viewer.off('hoverpick', this.handleHoverPick);
        // this.viewer.off('pick', this.handlePick);
        this.viewer.activeHandles.forEach(h => {
            this.viewer.unload(h.id);
        });
    }

    private loadViewer(): void {
        this.setState({isLoading: true});
        this.viewer = new Viewer(this.canvasRef.current!);
        
        this.setupCube();
        this.setupGrid();
        this.setupOverlay()
        const handleLoaded = (e: ViewerLoadedEvent) => {
            console.log('Model onLoaded - making visible', e);
            
            this.viewer.start();
            this.viewer.show(ViewType.DEFAULT);
            this.viewer.hoverPickEnabled = true;
            this.loaderOverlay.hide();
            this.navCube.stopped = false;
            this.grid.stopped = false;
            //ReactFlexViewerCard.updateCallback(this.state);
            this.setState({isLoading: false});
        }
        this.viewer.on('loaded', handleLoaded);

        this.viewer.on('error', args => console.log('Viewer error', args.message));

        const updateProgress = (message: Message) => {
            var progress = MessageProgress(message);
            if(message.phase === 0) {
                progress = 0;
            }
            if(message.type === MessageType.COMPLETED) {
                console.log('Model loading completed', message);
                this.setState({isLoaded: true, loadingProgress: 100});
            } else {
                this.setState({loadingProgress: progress});
            }
        }
        let headers: { [name: string]: string; } =  { 
            Authorization: 'Bearer '+ OpenAPI.TOKEN
        };
        const model = this.props.model;
        const url = `https://apis.xbim-dev.net/${Config.region}/aim/2.0/${Config.tenantId}/wexbim/${this.state.geometrySet}?assetId=${model.AssetId}&modelId=${model.AssetModelId}`
        this.viewer.loadAsync(url, 88256, headers, updateProgress);

        // WexbimService.wexbimGetComplete({tenantId: Config.tenantId,
        //     region: Config.region,
        //     assetId: model.AssetId!,
        //     modelId: model.AssetModelId!
        // }).then((blob: Blob) => this.viewer.loadAsync(blob, model.AssetModelId, headers, updateProgress));

        
        //this.loaderOverlay.show();
    }
     
    /** Change state when props change */
    static getDerivedStateFromProps(nextProps: Readonly<ViewerProps>, prevState: Readonly<State>) {
        console.log('derived', nextProps, prevState);
        return { selectedElement: nextProps.selectedElement};
    }
    
    //private static updateCallback: (data: object) => void = null;

    render() {
 
        const {loadingProgress, isLoaded, width, height} = this.state;
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
                    Selected element: {this.state.selectedElement}
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

    private convertHexRgb(hexCode? : string, opacity = 255) : number[]{
        if(!hexCode){
            return [0,0,255];
        }
        // var namedColor = names[hexCode];
        // if(namedColor){
        //     return namedColor;
        // }
        var hex = hexCode.replace('#', '');
    
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
    
        var r = parseInt(hex.substring(0,2), 16),
            g = parseInt(hex.substring(2,4), 16),
            b = parseInt(hex.substring(4,6), 16);

        
        return  [r,g,b,opacity];
    }
    
  }

    

export default ModelViewer;