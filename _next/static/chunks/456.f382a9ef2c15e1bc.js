"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[456],{7268:function(e,t,r){r.d(t,{O:function(){return u}});var i=r(7437),o=r(2265),a=r(9285),n=r(1106),s=r(1448),l=r(1898);function u(e){let{file:t,paint:r,length:u=3.4,position:h=[0,0,0],rotation:m=[0,0,0]}=e,{scene:f}=(0,n.L)((0,l.p)("/models/".concat(t))),c=(0,o.useRef)(null),d=(0,o.useMemo)(()=>new s.Color(r),[r]),p=(0,o.useMemo)(()=>f.clone(!0),[f]),v=(0,o.useMemo)(()=>({paint:new s.MeshPhysicalMaterial({color:new s.Color(r),metalness:.35,roughness:.28,clearcoat:1,clearcoatRoughness:.1}),wheel:new s.MeshStandardMaterial({color:"#0a0a0a",metalness:.25,roughness:.8})}),[p]);return(0,o.useLayoutEffect)(()=>{p.traverse(e=>{var t,r;if(!e.isMesh)return;let i=null!==(r=null===(t=e.parent)||void 0===t?void 0:t.name)&&void 0!==r?r:"",o=/wheel/i.test(e.name)||/wheel/i.test(i);e.material=o?v.wheel:v.paint,e.castShadow=!0});let e=new s.Box3().setFromObject(p).getSize(new s.Vector3),t=u/Math.max(e.x,e.z,.001);p.scale.setScalar(t);let r=new s.Box3().setFromObject(p),i=r.getCenter(new s.Vector3);p.position.set(-i.x,-r.min.y,-i.z)},[p,v,u]),(0,o.useEffect)(()=>()=>{v.paint.dispose(),v.wheel.dispose()},[v]),(0,a.F)((e,t)=>{v.paint.color.lerp(d,Math.min(1,4*t))}),(0,i.jsx)("group",{ref:c,position:h,rotation:m,children:(0,i.jsx)("primitive",{object:p})})}},7456:function(e,t,r){r.r(t),r.d(t,{Showroom:function(){return b}});var i=r(7437),o=r(2265),a=r(9285),n=r(961),s=r(1106),l=r(1119),u=r(1448);let h=parseInt(u.REVISION.replace(/\D+/g,""));class m extends u.ShaderMaterial{constructor(e=new u.Vector2){super({uniforms:{inputBuffer:new u.Uniform(null),depthBuffer:new u.Uniform(null),resolution:new u.Uniform(new u.Vector2),texelSize:new u.Uniform(new u.Vector2),halfTexelSize:new u.Uniform(new u.Vector2),kernel:new u.Uniform(0),scale:new u.Uniform(1),cameraNear:new u.Uniform(0),cameraFar:new u.Uniform(1),minDepthThreshold:new u.Uniform(0),maxDepthThreshold:new u.Uniform(1),depthScale:new u.Uniform(0),depthToBlurRatioBias:new u.Uniform(.25)},fragmentShader:`#include <common>
        #include <dithering_pars_fragment>      
        uniform sampler2D inputBuffer;
        uniform sampler2D depthBuffer;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          float depthFactor = 0.0;
          
          #ifdef USE_DEPTH
            vec4 depth = texture2D(depthBuffer, vUv);
            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
            depthFactor *= depthScale;
            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));
          #endif
          
          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));
          gl_FragColor = sum * 0.25 ;

          #include <dithering_fragment>
          #include <tonemapping_fragment>
          #include <${h>=154?"colorspace_fragment":"encodings_fragment"}>
        }`,vertexShader:`uniform vec2 texelSize;
        uniform vec2 halfTexelSize;
        uniform float kernel;
        uniform float scale;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          vec2 uv = position.xy * 0.5 + 0.5;
          vUv = uv;

          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;
          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);
          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);
          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);
          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);

          gl_Position = vec4(position.xy, 1.0, 1.0);
        }`,blending:u.NoBlending,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t),this.uniforms.halfTexelSize.value.set(e,t).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class f{constructor({gl:e,resolution:t,width:r=500,height:i=500,minDepthThreshold:o=0,maxDepthThreshold:a=1,depthScale:n=0,depthToBlurRatioBias:s=.25}){this.renderToScreen=!1,this.renderTargetA=new u.WebGLRenderTarget(t,t,{minFilter:u.LinearFilter,magFilter:u.LinearFilter,stencilBuffer:!1,depthBuffer:!1,type:u.HalfFloatType}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new m,this.convolutionMaterial.setTexelSize(1/r,1/i),this.convolutionMaterial.setResolution(new u.Vector2(r,i)),this.scene=new u.Scene,this.camera=new u.Camera,this.convolutionMaterial.uniforms.minDepthThreshold.value=o,this.convolutionMaterial.uniforms.maxDepthThreshold.value=a,this.convolutionMaterial.uniforms.depthScale.value=n,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=s,this.convolutionMaterial.defines.USE_DEPTH=n>0;let l=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),h=new Float32Array([0,0,2,0,0,2]),f=new u.BufferGeometry;f.setAttribute("position",new u.BufferAttribute(l,3)),f.setAttribute("uv",new u.BufferAttribute(h,2)),this.screen=new u.Mesh(f,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,t,r){let i,o,a;let n=this.scene,s=this.camera,l=this.renderTargetA,u=this.renderTargetB,h=this.convolutionMaterial,m=h.uniforms;m.depthBuffer.value=t.depthTexture;let f=h.kernel,c=t;for(o=0,a=f.length-1;o<a;++o)i=(1&o)==0?l:u,m.kernel.value=f[o],m.inputBuffer.value=c.texture,e.setRenderTarget(i),e.render(n,s),c=i;m.kernel.value=f[o],m.inputBuffer.value=c.texture,e.setRenderTarget(this.renderToScreen?null:r),e.render(n,s)}}class c extends u.MeshStandardMaterial{constructor(e={}){super(e),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var t;null!=(t=e.defines)&&t.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${e.vertexShader}`,e.vertexShader=e.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`),e.fragmentShader=`
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;

      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}}let d=o.forwardRef(({mixBlur:e=0,mixStrength:t=1,resolution:r=256,blur:i=[0,0],minDepthThreshold:n=.9,maxDepthThreshold:s=1,depthScale:h=0,depthToBlurRatioBias:m=.25,mirror:d=0,distortion:p=1,mixContrast:v=1,distortionMap:x,reflectorOffset:g=0,..._},D)=>{(0,a.e)({MeshReflectorMaterialImpl:c});let S=(0,a.D)(({gl:e})=>e),U=(0,a.D)(({camera:e})=>e),M=(0,a.D)(({scene:e})=>e),w=(i=Array.isArray(i)?i:[i,i])[0]+i[1]>0,y=o.useRef(null);o.useImperativeHandle(D,()=>y.current,[]);let[T]=o.useState(()=>new u.Plane),[B]=o.useState(()=>new u.Vector3),[b]=o.useState(()=>new u.Vector3),[F]=o.useState(()=>new u.Vector3),[R]=o.useState(()=>new u.Matrix4),[j]=o.useState(()=>new u.Vector3(0,0,-1)),[z]=o.useState(()=>new u.Vector4),[E]=o.useState(()=>new u.Vector3),[C]=o.useState(()=>new u.Vector3),[V]=o.useState(()=>new u.Vector4),[P]=o.useState(()=>new u.Matrix4),[L]=o.useState(()=>new u.PerspectiveCamera),k=o.useCallback(()=>{var e;let t=y.current.parent||(null==(e=y.current)?void 0:e.__r3f.parent);if(!t||(b.setFromMatrixPosition(t.matrixWorld),F.setFromMatrixPosition(U.matrixWorld),R.extractRotation(t.matrixWorld),B.set(0,0,1),B.applyMatrix4(R),b.addScaledVector(B,g),E.subVectors(b,F),E.dot(B)>0))return;E.reflect(B).negate(),E.add(b),R.extractRotation(U.matrixWorld),j.set(0,0,-1),j.applyMatrix4(R),j.add(F),C.subVectors(b,j),C.reflect(B).negate(),C.add(b),L.position.copy(E),L.up.set(0,1,0),L.up.applyMatrix4(R),L.up.reflect(B),L.lookAt(C),L.far=U.far,L.updateMatrixWorld(),L.projectionMatrix.copy(U.projectionMatrix),P.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),P.multiply(L.projectionMatrix),P.multiply(L.matrixWorldInverse),P.multiply(t.matrixWorld),T.setFromNormalAndCoplanarPoint(B,b),T.applyMatrix4(L.matrixWorldInverse),z.set(T.normal.x,T.normal.y,T.normal.z,T.constant);let r=L.projectionMatrix;V.x=(Math.sign(z.x)+r.elements[8])/r.elements[0],V.y=(Math.sign(z.y)+r.elements[9])/r.elements[5],V.z=-1,V.w=(1+r.elements[10])/r.elements[14],z.multiplyScalar(2/z.dot(V)),r.elements[2]=z.x,r.elements[6]=z.y,r.elements[10]=z.z+1,r.elements[14]=z.w},[U,g]),[A,I,N,O]=o.useMemo(()=>{let o={minFilter:u.LinearFilter,magFilter:u.LinearFilter,type:u.HalfFloatType},a=new u.WebGLRenderTarget(r,r,o);a.depthBuffer=!0,a.depthTexture=new u.DepthTexture(r,r),a.depthTexture.format=u.DepthFormat,a.depthTexture.type=u.UnsignedShortType;let l=new u.WebGLRenderTarget(r,r,o),c=new f({gl:S,resolution:r,width:i[0],height:i[1],minDepthThreshold:n,maxDepthThreshold:s,depthScale:h,depthToBlurRatioBias:m}),g={mirror:d,textureMatrix:P,mixBlur:e,tDiffuse:a.texture,tDepth:a.depthTexture,tDiffuseBlur:l.texture,hasBlur:w,mixStrength:t,minDepthThreshold:n,maxDepthThreshold:s,depthScale:h,depthToBlurRatioBias:m,distortion:p,distortionMap:x,mixContrast:v,"defines-USE_BLUR":w?"":void 0,"defines-USE_DEPTH":h>0?"":void 0,"defines-USE_DISTORTION":x?"":void 0};return[a,l,c,g]},[S,i,P,r,d,w,e,t,n,s,h,m,p,x,v]);return(0,a.F)(()=>{var e;let t=y.current.parent||(null==(e=y.current)?void 0:e.__r3f.parent);if(!t)return;t.visible=!1;let r=S.xr.enabled,i=S.shadowMap.autoUpdate;k(),S.xr.enabled=!1,S.shadowMap.autoUpdate=!1,S.setRenderTarget(A),S.state.buffers.depth.setMask(!0),S.autoClear||S.clear(),S.render(M,L),w&&N.render(S,A,I),S.xr.enabled=r,S.shadowMap.autoUpdate=i,t.visible=!0,S.setRenderTarget(null)}),o.createElement("meshReflectorMaterialImpl",(0,l.Z)({attach:"material",key:"key"+O["defines-USE_BLUR"]+O["defines-USE_DEPTH"]+O["defines-USE_DISTORTION"],ref:y},O,_))});var p=r(6007),v=r(269),x=r(1057),g=r(7268),_=r(8175),D=r(1898);_.Xu.forEach(e=>s.L.preload((0,D.p)("/models/".concat(e.file))));let S=[{x:-4.6,z:-2.4,rotationY:.55,delay:.55},{x:-2.4,z:-.6,rotationY:.35,delay:.3},{x:0,z:1.1,rotationY:-.25,delay:0},{x:2.4,z:-.6,rotationY:-.5,delay:.42},{x:4.6,z:-2.4,rotationY:-.75,delay:.68}],U=[{x:-1.6,z:-2.2,rotationY:.45,delay:.35},{x:0,z:.4,rotationY:-.3,delay:0},{x:1.6,z:-2.2,rotationY:-.7,delay:.5}],M=e=>e>=1?1:1-Math.pow(2,-10*e);function w(e){let{spec:t,slot:r,started:n,scrollRef:s,compact:l}=e,h=(0,o.useRef)(null),m=(0,o.useRef)(null);return(0,a.F)(e=>{let{clock:t}=e,i=h.current;if(!i)return;n&&null===m.current&&(m.current=t.elapsedTime);let o=M(Math.min(1,(null===m.current?0:Math.max(0,t.elapsedTime-m.current-r.delay))/1.9)),a=r.x+16,l=r.z-9,f=s.current;i.position.x=u.MathUtils.lerp(a,r.x,o)*(1+.9*f),i.position.z=u.MathUtils.lerp(l,r.z,o)-4*f,i.position.y=-(1.6*f)+.015*Math.sin(.7*t.elapsedTime+r.x),i.rotation.y=u.MathUtils.lerp(r.rotationY+1.4,r.rotationY,o),i.visible=o>.001}),(0,i.jsx)("group",{ref:h,visible:!1,children:(0,i.jsx)(g.O,{file:t.file,paint:t.paint,length:l?2.2:3.2})})}function y(e){let{scrollRef:t,compact:r}=e,{camera:i,pointer:o}=(0,a.D)();return(0,a.F)(()=>{let e=t.current;i.position.x=u.MathUtils.lerp(i.position.x,.9*o.x,.04),i.position.y=u.MathUtils.lerp(i.position.y,2.3+.3*o.y+2.2*e,.05),i.position.z=u.MathUtils.lerp(i.position.z,(r?17.5:15.5)+5*e,.05),i.lookAt(0,r?-1.5:-.35,0)}),null}function T(e){let{compact:t}=e;return(0,i.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[0,0,0],children:[(0,i.jsx)("planeGeometry",{args:[60,60]}),(0,i.jsx)(d,{blur:[400,120],resolution:t?256:768,mixBlur:1,mixStrength:38,roughness:.9,depthScale:1.1,minDepthThreshold:.4,maxDepthThreshold:1.3,color:"#050505",metalness:.6,mirror:.5})]})}function B(e){let{started:t,scrollRef:r,compact:a}=e,n=a?U:S,s=(0,o.useMemo)(()=>a?[_.Xu[0],_.Xu[1],_.Xu[3]]:_.Xu,[a]);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("color",{attach:"background",args:["#050505"]}),(0,i.jsx)("fog",{attach:"fog",args:["#050505",22,46]}),(0,i.jsx)("ambientLight",{intensity:.4}),(0,i.jsx)("spotLight",{position:[0,10,6],angle:.6,penumbra:.9,intensity:260,color:"#fff4e0",castShadow:!0}),(0,i.jsx)("spotLight",{position:[-9,5,-2],angle:.5,penumbra:1,intensity:120,color:"#e8b86d"}),(0,i.jsx)("spotLight",{position:[10,4,-6],angle:.6,penumbra:1,intensity:90,color:"#8ea2ff"}),(0,i.jsxs)(p.qA,{resolution:256,children:[(0,i.jsx)(v.D,{form:"rect",intensity:4,position:[0,6,-4],scale:[14,2,1],color:"#fff6e6"}),(0,i.jsx)(v.D,{form:"rect",intensity:2.5,position:[-8,3,2],rotation:[0,Math.PI/2,0],scale:[8,1.5,1],color:"#e8b86d"}),(0,i.jsx)(v.D,{form:"rect",intensity:2,position:[8,3,2],rotation:[0,-Math.PI/2,0],scale:[8,1.5,1],color:"#9fb2ff"}),(0,i.jsx)(v.D,{form:"ring",intensity:1.5,position:[0,8,4],scale:4,color:"#ffffff"})]}),(0,i.jsx)(y,{scrollRef:r,compact:a}),(0,i.jsx)(T,{compact:a}),(0,i.jsx)(x.j,{position:[0,.01,0],opacity:.75,scale:30,blur:2.4,far:4,color:"#000"}),(0,i.jsx)(o.Suspense,{fallback:null,children:s.map((e,o)=>{var s;return(0,i.jsx)(w,{spec:e,slot:null!==(s=n[o])&&void 0!==s?s:n[0],started:t,scrollRef:r,compact:a},e.file)})})]})}function b(e){let{started:t,scrollRef:r}=e,[a,s]=(0,o.useState)(!1);return(0,o.useEffect)(()=>{let e=window.matchMedia("(max-width: 767px)"),t=()=>s(e.matches);return t(),e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]),(0,i.jsx)(n.Xz,{dpr:[1,a?1.5:2],shadows:!0,camera:{position:[0,2.3,15.5],fov:a?38:28,near:.1,far:80},gl:{antialias:!0,powerPreference:"high-performance"},className:"!absolute inset-0",children:(0,i.jsx)(B,{started:t,scrollRef:r,compact:a})})}}}]);