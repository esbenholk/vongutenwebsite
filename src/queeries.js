const pageBlockQueeries =
  '_type=="video"=>{_type, cover, url, title, description}, _type=="row"=>{_type, fold, fill, rowContent[]{customImage, image, content,type, images, heading}}, _type =="connectedRessources" =>{_type, heading, cansortbyyear, cansortbytag, cansortbycategory, category[]->{_id, title, slug}, ressources[]->{_type, year, title, link, source, sourceLink, place, source,description, title, mainImage, url, buttons,categories[]->{title, slug}, tags}, type}, _type == "ticker" => {_type, showTicker, color},_type=="connectedRandoms"=>{_type, heading, randoms, upcomingproject}, _type == "hero" => { _type, heading, tagline, image{alt, type, asset->{_id,url}, hotspot}}, _type == "gallery" => { _type, heading,images}, _type == "customImage" => { _type, customImage{asset, hotspot, imageDescription}}, _type == "sortedProjects" => { _type, heading,categories}, _type == "expandedBreadContent"=> { _type, heading, content, type}, _type == "breadContent" => { _type, heading, content, type}, _type == "connectedProjects" => {_type, heading,type, projects[]->{title, year, time, place, slug, logoImage, mainImage, heroImage}}';
export const pageBuilderquerystring = `pageBuilder[]{_type=="pageBlock" =>{_type, name, type, title, pageBuilder[]{ ${pageBlockQueeries}}}, ${pageBlockQueeries}}`;
