import authRequired from '@services/authRequired'
import React from 'react'
import LoadingScreen from '@components/ui/LoadingScreen'
import MainLayout from '@components/ui/MainLayout'

export default function Home() {
  const user = authRequired({})

  if (!user) {
    return <LoadingScreen />
  }

  return (
    <MainLayout title="Home">
      <iframe
        src="http://kb.hq.fungeek.net/app/dashboards#/view/507e5180-ff59-11eb-879e-032c5552b030?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(description:'',layerListJSON:'%5B%7B%22sourceDescriptor%22:%7B%22type%22:%22EMS_TMS%22,%22isAutoSelect%22:true%7D,%22id%22:%225cddd799-b3c7-4614-a85e-6454de5332c1%22,%22label%22:null,%22minZoom%22:0,%22maxZoom%22:24,%22alpha%22:1,%22visible%22:true,%22style%22:%7B%22type%22:%22TILE%22%7D,%22type%22:%22VECTOR_TILE%22%7D,%7B%22sourceDescriptor%22:%7B%22indexPatternId%22:%225b1e4f10-ff58-11eb-879e-032c5552b030%22,%22geoField%22:%22terminalData.location%22,%22filterByMapBounds%22:true,%22scalingType%22:%22CLUSTERS%22,%22id%22:%22569aab6e-aacd-4591-9759-77b1b454bd64%22,%22type%22:%22ES_SEARCH%22,%22applyGlobalQuery%22:true,%22applyGlobalTime%22:true,%22tooltipProperties%22:%5B%5D,%22sortField%22:%22%22,%22sortOrder%22:%22desc%22,%22topHitsSplitField%22:%22%22,%22topHitsSize%22:1%7D,%22id%22:%2232806432-f307-432e-a362-68f36fbfda78%22,%22label%22:null,%22minZoom%22:0,%22maxZoom%22:24,%22alpha%22:0.75,%22visible%22:true,%22style%22:%7B%22type%22:%22VECTOR%22,%22properties%22:%7B%22icon%22:%7B%22type%22:%22STATIC%22,%22options%22:%7B%22value%22:%22marker%22%7D%7D,%22fillColor%22:%7B%22type%22:%22STATIC%22,%22options%22:%7B%22color%22:%22%2354B399%22%7D%7D,%22lineColor%22:%7B%22type%22:%22STATIC%22,%22options%22:%7B%22color%22:%22%2341937c%22%7D%7D,%22lineWidth%22:%7B%22type%22:%22STATIC%22,%22options%22:%7B%22size%22:1%7D%7D,%22iconSize%22:%7B%22type%22:%22STATIC%22,%22options%22:%7B%22size%22:6%7D%7D,%22iconOrientation%22:%7B%22type%22:%22STATIC%22,%22options%22:%7B%22orientation%22:0%7D%7D,%22labelText%22:%7B%22type%22:%22DYNAMIC%22,%22options%22:%7B%22field%22:%7B%22label%22:%22order_total%22,%22name%22:%22order_total%22,%22origin%22:%22source%22,%22type%22:%22number%22,%22supportsAutoDomain%22:true%7D%7D%7D,%22labelColor%22:%7B%22type%22:%22STATIC%22,%22options%22:%7B%22color%22:%22%23000000%22%7D%7D,%22labelSize%22:%7B%22type%22:%22DYNAMIC%22,%22options%22:%7B%22minSize%22:7,%22maxSize%22:32,%22fieldMetaOptions%22:%7B%22isEnabled%22:true,%22sigma%22:3%7D%7D%7D,%22labelBorderColor%22:%7B%22type%22:%22STATIC%22,%22options%22:%7B%22color%22:%22%23FFFFFF%22%7D%7D,%22symbolizeAs%22:%7B%22options%22:%7B%22value%22:%22circle%22%7D%7D,%22labelBorderSize%22:%7B%22options%22:%7B%22size%22:%22SMALL%22%7D%7D%7D,%22isTimeAware%22:true%7D,%22type%22:%22BLENDED_VECTOR%22,%22joins%22:%5B%5D%7D%5D',mapStateJSON:'%7B%22zoom%22:13.22,%22center%22:%7B%22lon%22:69.15292,%22lat%22:41.2678%7D,%22timeFilters%22:%7B%22from%22:%22now-15m%22,%22to%22:%22now%22%7D,%22refreshConfig%22:%7B%22isPaused%22:true,%22interval%22:0%7D,%22query%22:%7B%22query%22:%22%22,%22language%22:%22kuery%22%7D,%22filters%22:%5B%5D,%22settings%22:%7B%22autoFitToDataBounds%22:false,%22backgroundColor%22:%22%23ffffff%22,%22disableInteractive%22:false,%22disableTooltipControl%22:false,%22hideToolbarOverlay%22:false,%22hideLayerControl%22:false,%22hideViewControl%22:false,%22initialLocation%22:%22LAST_SAVED_LOCATION%22,%22fixedLocation%22:%7B%22lat%22:0,%22lon%22:0,%22zoom%22:2%7D,%22browserLocation%22:%7B%22zoom%22:2%7D,%22maxZoom%22:24,%22minZoom%22:0,%22showScaleControl%22:false,%22showSpatialFilters%22:true,%22spatialFiltersAlpa%22:0.3,%22spatialFiltersFillColor%22:%22%23DA8B45%22,%22spatialFiltersLineColor%22:%22%23DA8B45%22%7D%7D',references:!(),title:'Chopar%20Orders',uiStateJSON:'%7B%22isLayerTOCOpen%22:true,%22openTOCDetails%22:%5B%5D%7D'),enhancements:(),hiddenLayers:!(),isLayerTOCOpen:!f,mapBuffer:(maxLat:41.28918,maxLon:69.20222000000001,minLat:41.24642,minLon:69.10362),mapCenter:(lat:41.2678,lon:69.15292,zoom:13.22),openTOCDetails:!()),gridData:(h:15,i:'83ee1a7c-841d-4c3a-a304-d85933c54a87',w:24,x:0,y:0),panelIndex:'83ee1a7c-841d-4c3a-a304-d85933c54a87',type:map,version:'7.13.3'),(embeddableConfig:(enhancements:()),gridData:(h:15,i:'5b595c08-a2c0-4064-95bd-9cf8cfb20bcf',w:13,x:24,y:0),id:'476c8a80-ff59-11eb-879e-032c5552b030',panelIndex:'5b595c08-a2c0-4064-95bd-9cf8cfb20bcf',type:lens,version:'7.13.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Chopar%20Orders',viewMode:view)&show-time-filter=true"
        height="1600"
        width="100%"
      ></iframe>
    </MainLayout>
  )
}
