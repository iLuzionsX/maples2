(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Fc="179",$d=0,bl=1,Jd=2,Pu=1,Ao=2,Qn=3,oi=0,je=1,fe=2,ii=0,yi=1,se=2,wl=3,Tl=4,Zd=5,Oi=100,Qd=101,tf=102,ef=103,nf=104,sf=200,rf=201,of=202,af=203,Oa=204,Ba=205,cf=206,lf=207,hf=208,uf=209,df=210,ff=211,pf=212,mf=213,gf=214,ka=0,za=1,Ha=2,vs=3,Va=4,Ga=5,Wa=6,Xa=7,Iu=0,_f=1,vf=2,Si=0,Lu=1,Du=2,Nu=3,Oc=4,Uu=5,Fu=6,Ou=7,El="attached",xf="detached",Bu=300,xs=301,Ms=302,qa=303,Ka=304,Ro=306,Hi=1e3,Mi=1001,mo=1002,$e=1003,ku=1004,js=1005,rn=1006,so=1007,kn=1008,Gn=1009,zu=1010,Hu=1011,ir=1012,Bc=1013,Vi=1014,Pn=1015,si=1016,kc=1017,zc=1018,sr=1020,Vu=35902,Gu=1021,Wu=1022,vn=1023,rr=1026,or=1027,Hc=1028,Vc=1029,Xu=1030,Gc=1031,Wc=1033,ro=33776,oo=33777,ao=33778,co=33779,Ya=35840,ja=35841,$a=35842,Ja=35843,Za=36196,Qa=37492,tc=37496,ec=37808,nc=37809,ic=37810,sc=37811,rc=37812,oc=37813,ac=37814,cc=37815,lc=37816,hc=37817,uc=37818,dc=37819,fc=37820,pc=37821,lo=36492,mc=36494,gc=36495,qu=36283,_c=36284,vc=36285,xc=36286,Xc=2200,qc=2201,Mf=2202,ar=2300,cr=2301,Bo=2302,ls=2400,hs=2401,go=2402,Kc=2500,yf=2501,Sf=0,Ku=1,Mc=2,bf=3200,wf=3201,Yu=0,Tf=1,ei="",Re="srgb",Qe="srgb-linear",_o="linear",ne="srgb",qi=7680,Al=519,Ef=512,Af=513,Rf=514,ju=515,Cf=516,Pf=517,If=518,Lf=519,yc=35044,Df=35048,Nf=35040,Rl="300 es",zn=2e3,vo=2001;class Wi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Cl=1234567;const Js=Math.PI/180,ys=180/Math.PI;function Ln(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Be[i&255]+Be[i>>8&255]+Be[i>>16&255]+Be[i>>24&255]+"-"+Be[t&255]+Be[t>>8&255]+"-"+Be[t>>16&15|64]+Be[t>>24&255]+"-"+Be[e&63|128]+Be[e>>8&255]+"-"+Be[e>>16&255]+Be[e>>24&255]+Be[n&255]+Be[n>>8&255]+Be[n>>16&255]+Be[n>>24&255]).toLowerCase()}function Vt(i,t,e){return Math.max(t,Math.min(e,i))}function Yc(i,t){return(i%t+t)%t}function Uf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Ff(i,t,e){return i!==t?(e-i)/(t-i):0}function Zs(i,t,e){return(1-e)*i+e*t}function Of(i,t,e,n){return Zs(i,t,1-Math.exp(-e*n))}function Bf(i,t=1){return t-Math.abs(Yc(i,t*2)-t)}function kf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function zf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Hf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Vf(i,t){return i+Math.random()*(t-i)}function Gf(i){return i*(.5-Math.random())}function Wf(i){i!==void 0&&(Cl=i);let t=Cl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Xf(i){return i*Js}function qf(i){return i*ys}function Kf(i){return(i&i-1)===0&&i!==0}function Yf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function jf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function $f(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*m,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*m,a*c);break;case"ZYZ":i.set(l*m,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function An(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ie(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const jt={DEG2RAD:Js,RAD2DEG:ys,generateUUID:Ln,clamp:Vt,euclideanModulo:Yc,mapLinear:Uf,inverseLerp:Ff,lerp:Zs,damp:Of,pingpong:Bf,smoothstep:kf,smootherstep:zf,randInt:Hf,randFloat:Vf,randFloatSpread:Gf,seededRandom:Wf,degToRad:Xf,radToDeg:qf,isPowerOfTwo:Kf,ceilPowerOfTwo:Yf,floorPowerOfTwo:jf,setQuaternionFromProperEuler:$f,normalize:ie,denormalize:An};class ut{constructor(t=0,e=0){ut.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class un{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=_;return}if(u!==_||l!==d||c!==f||h!==m){let g=1-a;const p=l*d+c*f+h*m+u*_,v=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const T=Math.sqrt(M),E=Math.atan2(T,p*v);g=Math.sin(g*E)/T,a=Math.sin(a*E)/T}const x=a*v;if(l=l*g+d*x,c=c*g+f*x,h=h*g+m*x,u=u*g+_*x,g===1-a){const T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-a*f,t[e+2]=c*m+h*f+a*d-l*u,t[e+3]=h*m-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Vt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(t=0,e=0,n=0){R.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Pl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Pl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ko.copy(this).projectOnVector(t),this.sub(ko)}reflect(t){return this.sub(ko.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ko=new R,Pl=new un;class Bt{constructor(t,e,n,s,r,o,a,l,c){Bt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],v=s[1],M=s[4],x=s[7],T=s[2],E=s[5],C=s[8];return r[0]=o*_+a*v+l*T,r[3]=o*g+a*M+l*E,r[6]=o*p+a*x+l*C,r[1]=c*_+h*v+u*T,r[4]=c*g+h*M+u*E,r[7]=c*p+h*x+u*C,r[2]=d*_+f*v+m*T,r[5]=d*g+f*M+m*E,r[8]=d*p+f*x+m*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,m=e*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=u*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=d*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(zo.makeScale(t,e)),this}rotate(t){return this.premultiply(zo.makeRotation(-t)),this}translate(t,e){return this.premultiply(zo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const zo=new Bt;function $u(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function lr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Jf(){const i=lr("canvas");return i.style.display="block",i}const Il={};function ds(i){i in Il||(Il[i]=!0,console.warn(i))}function Zf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Ll=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dl=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Qf(){const i={enabled:!0,workingColorSpace:Qe,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ne&&(s.r=ri(s.r),s.g=ri(s.g),s.b=ri(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ne&&(s.r=fs(s.r),s.g=fs(s.g),s.b=fs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ei?_o:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ds("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ds("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Qe]:{primaries:t,whitePoint:n,transfer:_o,toXYZ:Ll,fromXYZ:Dl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Re},outputColorSpaceConfig:{drawingBufferColorSpace:Re}},[Re]:{primaries:t,whitePoint:n,transfer:ne,toXYZ:Ll,fromXYZ:Dl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Re}}}),i}const Kt=Qf();function ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function fs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ki;class tp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ki===void 0&&(Ki=lr("canvas")),Ki.width=t.width,Ki.height=t.height;const s=Ki.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ki}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=lr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ri(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ri(e[n]/255)*255):e[n]=ri(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ep=0;class jc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=Ln(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ho(s[o].image)):r.push(Ho(s[o]))}else r=Ho(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ho(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?tp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let np=0;const Vo=new R;class Pe extends Wi{constructor(t=Pe.DEFAULT_IMAGE,e=Pe.DEFAULT_MAPPING,n=Mi,s=Mi,r=rn,o=kn,a=vn,l=Gn,c=Pe.DEFAULT_ANISOTROPY,h=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=Ln(),this.name="",this.source=new jc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Vo).x}get height(){return this.source.getSize(Vo).y}get depth(){return this.source.getSize(Vo).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Bu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Hi:t.x=t.x-Math.floor(t.x);break;case Mi:t.x=t.x<0?0:1;break;case mo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Hi:t.y=t.y-Math.floor(t.y);break;case Mi:t.y=t.y<0?0:1;break;case mo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pe.DEFAULT_IMAGE=null;Pe.DEFAULT_MAPPING=Bu;Pe.DEFAULT_ANISOTROPY=1;class Zt{constructor(t=0,e=0,n=0,s=1){Zt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,x=(f+1)/2,T=(p+1)/2,E=(h+d)/4,C=(u+_)/4,I=(m+g)/4;return M>x&&M>T?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=E/n,r=C/n):x>T?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=E/s,r=I/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=C/r,s=I/r),this.set(n,s,r,e),this}let v=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this.w=Vt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this.w=Vt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ip extends Wi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Zt(0,0,t,e),this.scissorTest=!1,this.viewport=new Zt(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Pe(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:rn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new jc(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Dn extends ip{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ju extends Pe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class sp extends Pe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fn{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(bn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(bn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=bn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,bn):bn.fromBufferAttribute(r,o),bn.applyMatrix4(t.matrixWorld),this.expandByPoint(bn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),gr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),gr.copy(n.boundingBox)),gr.applyMatrix4(t.matrixWorld),this.union(gr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,bn),bn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Us),_r.subVectors(this.max,Us),Yi.subVectors(t.a,Us),ji.subVectors(t.b,Us),$i.subVectors(t.c,Us),hi.subVectors(ji,Yi),ui.subVectors($i,ji),Ei.subVectors(Yi,$i);let e=[0,-hi.z,hi.y,0,-ui.z,ui.y,0,-Ei.z,Ei.y,hi.z,0,-hi.x,ui.z,0,-ui.x,Ei.z,0,-Ei.x,-hi.y,hi.x,0,-ui.y,ui.x,0,-Ei.y,Ei.x,0];return!Go(e,Yi,ji,$i,_r)||(e=[1,0,0,0,1,0,0,0,1],!Go(e,Yi,ji,$i,_r))?!1:(vr.crossVectors(hi,ui),e=[vr.x,vr.y,vr.z],Go(e,Yi,ji,$i,_r))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,bn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(bn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(qn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const qn=[new R,new R,new R,new R,new R,new R,new R,new R],bn=new R,gr=new fn,Yi=new R,ji=new R,$i=new R,hi=new R,ui=new R,Ei=new R,Us=new R,_r=new R,vr=new R,Ai=new R;function Go(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ai.fromArray(i,r);const a=s.x*Math.abs(Ai.x)+s.y*Math.abs(Ai.y)+s.z*Math.abs(Ai.z),l=t.dot(Ai),c=e.dot(Ai),h=n.dot(Ai);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const rp=new fn,Fs=new R,Wo=new R;class Nn{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):rp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fs.subVectors(t,this.center);const e=Fs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Fs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Wo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fs.copy(t.center).add(Wo)),this.expandByPoint(Fs.copy(t.center).sub(Wo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Kn=new R,Xo=new R,xr=new R,di=new R,qo=new R,Mr=new R,Ko=new R;class hr{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Kn.copy(this.origin).addScaledVector(this.direction,e),Kn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Xo.copy(t).add(e).multiplyScalar(.5),xr.copy(e).sub(t).normalize(),di.copy(this.origin).sub(Xo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(xr),a=di.dot(this.direction),l=-di.dot(xr),c=di.lengthSq(),h=Math.abs(1-o*o);let u,d,f,m;if(h>0)if(u=o*l-a,d=o*a-l,m=r*h,u>=0)if(d>=-m)if(d<=m){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Xo).addScaledVector(xr,d),f}intersectSphere(t,e){Kn.subVectors(t.center,this.origin);const n=Kn.dot(this.direction),s=Kn.dot(Kn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Kn)!==null}intersectTriangle(t,e,n,s,r){qo.subVectors(e,t),Mr.subVectors(n,t),Ko.crossVectors(qo,Mr);let o=this.direction.dot(Ko),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;di.subVectors(this.origin,t);const l=a*this.direction.dot(Mr.crossVectors(di,Mr));if(l<0)return null;const c=a*this.direction.dot(qo.cross(di));if(c<0||l+c>o)return null;const h=-a*di.dot(Ko);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Rt{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,m,_,g){Rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,_,g)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,_,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Rt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ji.setFromMatrixColumn(t,0).length(),r=1/Ji.setFromMatrixColumn(t,1).length(),o=1/Ji.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,m=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-_*c,e[9]=-a*l,e[2]=_-d*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,m=c*h,_=c*u;e[0]=d+_*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=_+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,m=c*h,_=c*u;e[0]=d-_*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,m=a*h,_=a*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,m=a*l,_=a*c;e[0]=l*h,e[4]=_-d*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-_*u}else if(t.order==="XZY"){const d=o*l,f=o*c,m=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(op,t,ap)}lookAt(t,e,n){const s=this.elements;return cn.subVectors(t,e),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),fi.crossVectors(n,cn),fi.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),fi.crossVectors(n,cn)),fi.normalize(),yr.crossVectors(cn,fi),s[0]=fi.x,s[4]=yr.x,s[8]=cn.x,s[1]=fi.y,s[5]=yr.y,s[9]=cn.y,s[2]=fi.z,s[6]=yr.z,s[10]=cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],v=n[3],M=n[7],x=n[11],T=n[15],E=s[0],C=s[4],I=s[8],S=s[12],b=s[1],P=s[5],O=s[9],z=s[13],V=s[2],Y=s[6],q=s[10],j=s[14],H=s[3],ot=s[7],dt=s[11],wt=s[15];return r[0]=o*E+a*b+l*V+c*H,r[4]=o*C+a*P+l*Y+c*ot,r[8]=o*I+a*O+l*q+c*dt,r[12]=o*S+a*z+l*j+c*wt,r[1]=h*E+u*b+d*V+f*H,r[5]=h*C+u*P+d*Y+f*ot,r[9]=h*I+u*O+d*q+f*dt,r[13]=h*S+u*z+d*j+f*wt,r[2]=m*E+_*b+g*V+p*H,r[6]=m*C+_*P+g*Y+p*ot,r[10]=m*I+_*O+g*q+p*dt,r[14]=m*S+_*z+g*j+p*wt,r[3]=v*E+M*b+x*V+T*H,r[7]=v*C+M*P+x*Y+T*ot,r[11]=v*I+M*O+x*q+T*dt,r[15]=v*S+M*z+x*j+T*wt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+_*(+e*l*f-e*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+g*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-e*l*u+e*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],_=t[13],g=t[14],p=t[15],v=u*g*c-_*d*c+_*l*f-a*g*f-u*l*p+a*d*p,M=m*d*c-h*g*c-m*l*f+o*g*f+h*l*p-o*d*p,x=h*_*c-m*u*c+m*a*f-o*_*f-h*a*p+o*u*p,T=m*u*l-h*_*l-m*a*d+o*_*d+h*a*g-o*u*g,E=e*v+n*M+s*x+r*T;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/E;return t[0]=v*C,t[1]=(_*d*r-u*g*r-_*s*f+n*g*f+u*s*p-n*d*p)*C,t[2]=(a*g*r-_*l*r+_*s*c-n*g*c-a*s*p+n*l*p)*C,t[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*C,t[4]=M*C,t[5]=(h*g*r-m*d*r+m*s*f-e*g*f-h*s*p+e*d*p)*C,t[6]=(m*l*r-o*g*r-m*s*c+e*g*c+o*s*p-e*l*p)*C,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*f+e*l*f)*C,t[8]=x*C,t[9]=(m*u*r-h*_*r-m*n*f+e*_*f+h*n*p-e*u*p)*C,t[10]=(o*_*r-m*a*r+m*n*c-e*_*c-o*n*p+e*a*p)*C,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*C,t[12]=T*C,t[13]=(h*_*s-m*u*s+m*n*d-e*_*d-h*n*g+e*u*g)*C,t[14]=(m*a*s-o*_*s-m*n*l+e*_*l+o*n*g-e*a*g)*C,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*d+e*a*d)*C,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,m=r*u,_=o*h,g=o*u,p=a*u,v=l*c,M=l*h,x=l*u,T=n.x,E=n.y,C=n.z;return s[0]=(1-(_+p))*T,s[1]=(f+x)*T,s[2]=(m-M)*T,s[3]=0,s[4]=(f-x)*E,s[5]=(1-(d+p))*E,s[6]=(g+v)*E,s[7]=0,s[8]=(m+M)*C,s[9]=(g-v)*C,s[10]=(1-(d+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ji.set(s[0],s[1],s[2]).length();const o=Ji.set(s[4],s[5],s[6]).length(),a=Ji.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],wn.copy(this);const c=1/r,h=1/o,u=1/a;return wn.elements[0]*=c,wn.elements[1]*=c,wn.elements[2]*=c,wn.elements[4]*=h,wn.elements[5]*=h,wn.elements[6]*=h,wn.elements[8]*=u,wn.elements[9]*=u,wn.elements[10]*=u,e.setFromRotationMatrix(wn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=zn,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let m,_;if(l)m=r/(o-r),_=o*r/(o-r);else if(a===zn)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===vo)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=zn,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s);let m,_;if(l)m=1/(o-r),_=o/(o-r);else if(a===zn)m=-2/(o-r),_=-(o+r)/(o-r);else if(a===vo)m=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ji=new R,wn=new Rt,op=new R(0,0,0),ap=new R(1,1,1),fi=new R,yr=new R,cn=new R,Nl=new Rt,Ul=new un;class Mn{constructor(t=0,e=0,n=0,s=Mn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Vt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Nl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Nl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ul.setFromEuler(this),this.setFromQuaternion(Ul,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mn.DEFAULT_ORDER="XYZ";class $c{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let cp=0;const Fl=new R,Zi=new un,Yn=new Rt,Sr=new R,Os=new R,lp=new R,hp=new un,Ol=new R(1,0,0),Bl=new R(0,1,0),kl=new R(0,0,1),zl={type:"added"},up={type:"removed"},Qi={type:"childadded",child:null},Yo={type:"childremoved",child:null};class pe extends Wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=Ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pe.DEFAULT_UP.clone();const t=new R,e=new Mn,n=new un,s=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Rt},normalMatrix:{value:new Bt}}),this.matrix=new Rt,this.matrixWorld=new Rt,this.matrixAutoUpdate=pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $c,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.premultiply(Zi),this}rotateX(t){return this.rotateOnAxis(Ol,t)}rotateY(t){return this.rotateOnAxis(Bl,t)}rotateZ(t){return this.rotateOnAxis(kl,t)}translateOnAxis(t,e){return Fl.copy(t).applyQuaternion(this.quaternion),this.position.add(Fl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ol,t)}translateY(t){return this.translateOnAxis(Bl,t)}translateZ(t){return this.translateOnAxis(kl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Sr.copy(t):Sr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(Os,Sr,this.up):Yn.lookAt(Sr,Os,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),Zi.setFromRotationMatrix(Yn),this.quaternion.premultiply(Zi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(zl),Qi.child=t,this.dispatchEvent(Qi),Qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(up),Yo.child=t,this.dispatchEvent(Yo),Yo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(zl),Qi.child=t,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,t,lp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,hp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}pe.DEFAULT_UP=new R(0,1,0);pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Tn=new R,jn=new R,jo=new R,$n=new R,ts=new R,es=new R,Hl=new R,$o=new R,Jo=new R,Zo=new R,Qo=new Zt,ta=new Zt,ea=new Zt;class Rn{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Tn.subVectors(t,e),s.cross(Tn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Tn.subVectors(s,e),jn.subVectors(n,e),jo.subVectors(t,e);const o=Tn.dot(Tn),a=Tn.dot(jn),l=Tn.dot(jo),c=jn.dot(jn),h=jn.dot(jo),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,m=(o*h-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,$n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,$n.x),l.addScaledVector(o,$n.y),l.addScaledVector(a,$n.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Qo.setScalar(0),ta.setScalar(0),ea.setScalar(0),Qo.fromBufferAttribute(t,e),ta.fromBufferAttribute(t,n),ea.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Qo,r.x),o.addScaledVector(ta,r.y),o.addScaledVector(ea,r.z),o}static isFrontFacing(t,e,n,s){return Tn.subVectors(n,e),jn.subVectors(t,e),Tn.cross(jn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Tn.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),Tn.cross(jn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Rn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;ts.subVectors(s,n),es.subVectors(r,n),$o.subVectors(t,n);const l=ts.dot($o),c=es.dot($o);if(l<=0&&c<=0)return e.copy(n);Jo.subVectors(t,s);const h=ts.dot(Jo),u=es.dot(Jo);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(ts,o);Zo.subVectors(t,r);const f=ts.dot(Zo),m=es.dot(Zo);if(m>=0&&f<=m)return e.copy(r);const _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(es,a);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return Hl.subVectors(r,s),a=(u-h)/(u-h+(f-m)),e.copy(s).addScaledVector(Hl,a);const p=1/(g+_+d);return o=_*p,a=d*p,e.copy(n).addScaledVector(ts,o).addScaledVector(es,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Zu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pi={h:0,s:0,l:0},br={h:0,s:0,l:0};function na(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class yt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Re){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Kt.workingColorSpace){if(t=Yc(t,1),e=Vt(e,0,1),n=Vt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=na(o,r,t+1/3),this.g=na(o,r,t),this.b=na(o,r,t-1/3)}return Kt.colorSpaceToWorking(this,s),this}setStyle(t,e=Re){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Re){const n=Zu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ri(t.r),this.g=ri(t.g),this.b=ri(t.b),this}copyLinearToSRGB(t){return this.r=fs(t.r),this.g=fs(t.g),this.b=fs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Re){return Kt.workingToColorSpace(ke.copy(this),t),Math.round(Vt(ke.r*255,0,255))*65536+Math.round(Vt(ke.g*255,0,255))*256+Math.round(Vt(ke.b*255,0,255))}getHexString(t=Re){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.workingToColorSpace(ke.copy(this),e);const n=ke.r,s=ke.g,r=ke.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.workingToColorSpace(ke.copy(this),e),t.r=ke.r,t.g=ke.g,t.b=ke.b,t}getStyle(t=Re){Kt.workingToColorSpace(ke.copy(this),t);const e=ke.r,n=ke.g,s=ke.b;return t!==Re?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(pi),this.setHSL(pi.h+t,pi.s+e,pi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(pi),t.getHSL(br);const n=Zs(pi.h,br.h,e),s=Zs(pi.s,br.s,e),r=Zs(pi.l,br.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ke=new yt;yt.NAMES=Zu;let dp=0;class Hn extends Wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=Ln(),this.name="",this.type="Material",this.blending=yi,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oa,this.blendDst=Ba,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qi,this.stencilZFail=qi,this.stencilZPass=qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==yi&&(n.blending=this.blending),this.side!==oi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Oa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ba&&(n.blendDst=this.blendDst),this.blendEquation!==Oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Al&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Nt extends Hn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=Iu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const we=new R,wr=new ut;let fp=0;class Je{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:fp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=yc,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)wr.fromBufferAttribute(this,e),wr.applyMatrix3(t),this.setXY(e,wr.x,wr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=An(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ie(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=An(e,this.array)),e}setX(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=An(e,this.array)),e}setY(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=An(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=An(e,this.array)),e}setW(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array),s=ie(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array),s=ie(s,this.array),r=ie(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==yc&&(t.usage=this.usage),t}}class Qu extends Je{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class td extends Je{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Wt extends Je{constructor(t,e,n){super(new Float32Array(t),e,n)}}let pp=0;const gn=new Rt,ia=new pe,ns=new R,ln=new fn,Bs=new fn,Ne=new R;class be extends Wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pp++}),this.uuid=Ln(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new($u(t)?td:Qu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Bt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return gn.makeRotationFromQuaternion(t),this.applyMatrix4(gn),this}rotateX(t){return gn.makeRotationX(t),this.applyMatrix4(gn),this}rotateY(t){return gn.makeRotationY(t),this.applyMatrix4(gn),this}rotateZ(t){return gn.makeRotationZ(t),this.applyMatrix4(gn),this}translate(t,e,n){return gn.makeTranslation(t,e,n),this.applyMatrix4(gn),this}scale(t,e,n){return gn.makeScale(t,e,n),this.applyMatrix4(gn),this}lookAt(t){return ia.lookAt(t),ia.updateMatrix(),this.applyMatrix4(ia.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Wt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];ln.setFromBufferAttribute(r),this.morphTargetsRelative?(Ne.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(Ne),Ne.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(Ne)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if(ln.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Bs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ne.addVectors(ln.min,Bs.min),ln.expandByPoint(Ne),Ne.addVectors(ln.max,Bs.max),ln.expandByPoint(Ne)):(ln.expandByPoint(Bs.min),ln.expandByPoint(Bs.max))}ln.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ne.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ne));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ne.fromBufferAttribute(a,c),l&&(ns.fromBufferAttribute(t,c),Ne.add(ns)),s=Math.max(s,n.distanceToSquared(Ne))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Je(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<n.count;I++)a[I]=new R,l[I]=new R;const c=new R,h=new R,u=new R,d=new ut,f=new ut,m=new ut,_=new R,g=new R;function p(I,S,b){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,b),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,b),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const P=1/(f.x*m.y-m.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(P),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(P),a[I].add(_),a[S].add(_),a[b].add(_),l[I].add(g),l[S].add(g),l[b].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let I=0,S=v.length;I<S;++I){const b=v[I],P=b.start,O=b.count;for(let z=P,V=P+O;z<V;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const M=new R,x=new R,T=new R,E=new R;function C(I){T.fromBufferAttribute(s,I),E.copy(T);const S=a[I];M.copy(S),M.sub(T.multiplyScalar(T.dot(S))).normalize(),x.crossVectors(E,S);const P=x.dot(l[I])<0?-1:1;o.setXYZW(I,M.x,M.y,M.z,P)}for(let I=0,S=v.length;I<S;++I){const b=v[I],P=b.start,O=b.count;for(let z=P,V=P+O;z<V;z+=3)C(t.getX(z+0)),C(t.getX(z+1)),C(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Je(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new R,r=new R,o=new R,a=new R,l=new R,c=new R,h=new R,u=new R;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),_=t.getX(d+1),g=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ne.fromBufferAttribute(t,e),Ne.normalize(),t.setXYZ(e,Ne.x,Ne.y,Ne.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new Je(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new be,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Vl=new Rt,Ri=new hr,Tr=new Nn,Gl=new R,Er=new R,Ar=new R,Rr=new R,sa=new R,Cr=new R,Wl=new R,Pr=new R;class $ extends pe{constructor(t=new be,e=new Nt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Cr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(sa.fromBufferAttribute(u,t),o?Cr.addScaledVector(sa,h):Cr.addScaledVector(sa.sub(e),h))}e.add(Cr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Tr.copy(n.boundingSphere),Tr.applyMatrix4(r),Ri.copy(t.ray).recast(t.near),!(Tr.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(Tr,Gl)===null||Ri.origin.distanceToSquared(Gl)>(t.far-t.near)**2))&&(Vl.copy(r).invert(),Ri.copy(t.ray).applyMatrix4(Vl),!(n.boundingBox!==null&&Ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ri)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=o[g.materialIndex],v=Math.max(g.start,f.start),M=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let x=v,T=M;x<T;x+=3){const E=a.getX(x),C=a.getX(x+1),I=a.getX(x+2);s=Ir(this,p,t,n,c,h,u,E,C,I),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const v=a.getX(g),M=a.getX(g+1),x=a.getX(g+2);s=Ir(this,o,t,n,c,h,u,v,M,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=o[g.materialIndex],v=Math.max(g.start,f.start),M=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=v,T=M;x<T;x+=3){const E=x,C=x+1,I=x+2;s=Ir(this,p,t,n,c,h,u,E,C,I),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const v=g,M=g+1,x=g+2;s=Ir(this,o,t,n,c,h,u,v,M,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function mp(i,t,e,n,s,r,o,a){let l;if(t.side===je?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===oi,a),l===null)return null;Pr.copy(a),Pr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Pr);return c<e.near||c>e.far?null:{distance:c,point:Pr.clone(),object:i}}function Ir(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Er),i.getVertexPosition(l,Ar),i.getVertexPosition(c,Rr);const h=mp(i,t,e,n,Er,Ar,Rr,Wl);if(h){const u=new R;Rn.getBarycoord(Wl,Er,Ar,Rr,u),s&&(h.uv=Rn.getInterpolatedAttribute(s,a,l,c,u,new ut)),r&&(h.uv1=Rn.getInterpolatedAttribute(r,a,l,c,u,new ut)),o&&(h.normal=Rn.getInterpolatedAttribute(o,a,l,c,u,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new R,materialIndex:0};Rn.getNormal(Er,Ar,Rr,d.normal),h.face=d,h.barycoord=u}return h}class Ee extends be{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Wt(c,3)),this.setAttribute("normal",new Wt(h,3)),this.setAttribute("uv",new Wt(u,2));function m(_,g,p,v,M,x,T,E,C,I,S){const b=x/C,P=T/I,O=x/2,z=T/2,V=E/2,Y=C+1,q=I+1;let j=0,H=0;const ot=new R;for(let dt=0;dt<q;dt++){const wt=dt*P-z;for(let zt=0;zt<Y;zt++){const ue=zt*b-O;ot[_]=ue*v,ot[g]=wt*M,ot[p]=V,c.push(ot.x,ot.y,ot.z),ot[_]=0,ot[g]=0,ot[p]=E>0?1:-1,h.push(ot.x,ot.y,ot.z),u.push(zt/C),u.push(1-dt/I),j+=1}}for(let dt=0;dt<I;dt++)for(let wt=0;wt<C;wt++){const zt=d+wt+Y*dt,ue=d+wt+Y*(dt+1),oe=d+(wt+1)+Y*(dt+1),X=d+(wt+1)+Y*dt;l.push(zt,ue,X),l.push(ue,oe,X),H+=6}a.addGroup(f,H,S),f+=H,d+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ee(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ss(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ke(i){const t={};for(let e=0;e<i.length;e++){const n=Ss(i[e]);for(const s in n)t[s]=n[s]}return t}function gp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ed(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const bs={clone:Ss,merge:Ke};var _p=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Oe extends Hn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_p,this.fragmentShader=vp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ss(t.uniforms),this.uniformsGroups=gp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class nd extends pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Rt,this.projectionMatrix=new Rt,this.projectionMatrixInverse=new Rt,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const mi=new R,Xl=new ut,ql=new ut;class Ye extends nd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ys*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Js*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ys*2*Math.atan(Math.tan(Js*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(mi.x,mi.y).multiplyScalar(-t/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(mi.x,mi.y).multiplyScalar(-t/mi.z)}getViewSize(t,e){return this.getViewBounds(t,Xl,ql),e.subVectors(ql,Xl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Js*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const is=-90,ss=1;class xp extends pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ye(is,ss,t,e);s.layers=this.layers,this.add(s);const r=new Ye(is,ss,t,e);r.layers=this.layers,this.add(r);const o=new Ye(is,ss,t,e);o.layers=this.layers,this.add(o);const a=new Ye(is,ss,t,e);a.layers=this.layers,this.add(a);const l=new Ye(is,ss,t,e);l.layers=this.layers,this.add(l);const c=new Ye(is,ss,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===vo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class id extends Pe{constructor(t=[],e=xs,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Mp extends Dn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new id(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ee(5,5,5),r=new Oe({name:"CubemapFromEquirect",uniforms:Ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:je,blending:ii});r.uniforms.tEquirect.value=e;const o=new $(s,r),a=e.minFilter;return e.minFilter===kn&&(e.minFilter=rn),new xp(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class Gt extends pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yp={type:"move"};class ra{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,n),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(yp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Gt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Jc{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new yt(t),this.density=e}clone(){return new Jc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Sp extends pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mn,this.environmentIntensity=1,this.environmentRotation=new Mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class bp{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=yc,this.updateRanges=[],this.version=0,this.uuid=Ln()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const qe=new R;class Zc{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix4(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyNormalMatrix(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.transformDirection(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=An(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ie(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=An(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=An(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=An(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=An(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array),s=ie(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array),s=ie(s,this.array),r=ie(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Je(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Zc(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Kl=new R,Yl=new Zt,jl=new Zt,wp=new R,$l=new Rt,Lr=new R,oa=new Nn,Jl=new Rt,aa=new hr;class Tp extends ${constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=El,this.bindMatrix=new Rt,this.bindMatrixInverse=new Rt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new fn),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Lr),this.boundingBox.expandByPoint(Lr)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Nn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Lr),this.boundingSphere.expandByPoint(Lr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),oa.copy(this.boundingSphere),oa.applyMatrix4(s),t.ray.intersectsSphere(oa)!==!1&&(Jl.copy(s).invert(),aa.copy(t.ray).applyMatrix4(Jl),!(this.boundingBox!==null&&aa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,aa)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Zt,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===El?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===xf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;Yl.fromBufferAttribute(s.attributes.skinIndex,t),jl.fromBufferAttribute(s.attributes.skinWeight,t),Kl.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const o=jl.getComponent(r);if(o!==0){const a=Yl.getComponent(r);$l.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(wp.copy(Kl).applyMatrix4($l),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class sd extends pe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class rd extends Pe{constructor(t=null,e=1,n=1,s,r,o,a,l,c=$e,h=$e,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Zl=new Rt,Ep=new Rt;class Qc{constructor(t=[],e=[]){this.uuid=Ln(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Rt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Rt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:Ep;Zl.multiplyMatrices(a,e[r]),Zl.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Qc(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new rd(e,t,t,vn,Pn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new sd),this.bones.push(o),this.boneInverses.push(new Rt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=n[s];t.boneInverses.push(a.toArray())}return t}}class Sc extends Je{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const rs=new Rt,Ql=new Rt,Dr=[],th=new fn,Ap=new Rt,ks=new $,zs=new Nn;class tl extends ${constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Sc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ap)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new fn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,rs),th.copy(t.boundingBox).applyMatrix4(rs),this.boundingBox.union(th)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Nn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,rs),zs.copy(t.boundingSphere).applyMatrix4(rs),this.boundingSphere.union(zs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(ks.geometry=this.geometry,ks.material=this.material,ks.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zs.copy(this.boundingSphere),zs.applyMatrix4(n),t.ray.intersectsSphere(zs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,rs),Ql.multiplyMatrices(n,rs),ks.matrixWorld=Ql,ks.raycast(t,Dr);for(let o=0,a=Dr.length;o<a;o++){const l=Dr[o];l.instanceId=r,l.object=this,e.push(l)}Dr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Sc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new rd(new Float32Array(s*this.count),s,this.count,Hc,Pn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ca=new R,Rp=new R,Cp=new Bt;class Ui{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ca.subVectors(n,e).cross(Rp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ca),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Cp.getNormalMatrix(t),s=this.coplanarPoint(ca).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ci=new Nn,Pp=new ut(.5,.5),Nr=new R;class ur{constructor(t=new Ui,e=new Ui,n=new Ui,s=new Ui,r=new Ui,o=new Ui){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=zn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],_=r[9],g=r[10],p=r[11],v=r[12],M=r[13],x=r[14],T=r[15];if(s[0].setComponents(c-o,f-h,p-m,T-v).normalize(),s[1].setComponents(c+o,f+h,p+m,T+v).normalize(),s[2].setComponents(c+a,f+u,p+_,T+M).normalize(),s[3].setComponents(c-a,f-u,p-_,T-M).normalize(),n)s[4].setComponents(l,d,g,x).normalize(),s[5].setComponents(c-l,f-d,p-g,T-x).normalize();else if(s[4].setComponents(c-l,f-d,p-g,T-x).normalize(),e===zn)s[5].setComponents(c+l,f+d,p+g,T+x).normalize();else if(e===vo)s[5].setComponents(l,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(t){Ci.center.set(0,0,0);const e=Pp.distanceTo(t.center);return Ci.radius=.7071067811865476+e,Ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Nr.x=s.normal.x>0?t.max.x:t.min.x,Nr.y=s.normal.y>0?t.max.y:t.min.y,Nr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Nr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class od extends Hn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const xo=new R,Mo=new R,eh=new Rt,Hs=new hr,Ur=new Nn,la=new R,nh=new R;class el extends pe{constructor(t=new be,e=new od){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)xo.fromBufferAttribute(e,s-1),Mo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=xo.distanceTo(Mo);t.setAttribute("lineDistance",new Wt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ur.copy(n.boundingSphere),Ur.applyMatrix4(s),Ur.radius+=r,t.ray.intersectsSphere(Ur)===!1)return;eh.copy(s).invert(),Hs.copy(t.ray).applyMatrix4(eh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=c){const p=h.getX(_),v=h.getX(_+1),M=Fr(this,t,Hs,l,p,v,_);M&&e.push(M)}if(this.isLineLoop){const _=h.getX(m-1),g=h.getX(f),p=Fr(this,t,Hs,l,_,g,m-1);p&&e.push(p)}}else{const f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=c){const p=Fr(this,t,Hs,l,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=Fr(this,t,Hs,l,m-1,f,m-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Fr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(xo.fromBufferAttribute(a,s),Mo.fromBufferAttribute(a,r),e.distanceSqToSegment(xo,Mo,la,nh)>n)return;la.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(la);if(!(c<t.near||c>t.far))return{distance:c,point:nh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const ih=new R,sh=new R;class Ip extends el{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)ih.fromBufferAttribute(e,s),sh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+ih.distanceTo(sh);t.setAttribute("lineDistance",new Wt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Lp extends el{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class ad extends Hn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new yt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const rh=new Rt,bc=new hr,Or=new Nn,Br=new R;class Dp extends pe{constructor(t=new be,e=new ad){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(s),Or.radius+=r,t.ray.intersectsSphere(Or)===!1)return;rh.copy(s).invert(),bc.copy(t.ray).applyMatrix4(rh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=d,_=f;m<_;m++){const g=c.getX(m);Br.fromBufferAttribute(u,g),oh(Br,g,l,s,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,_=f;m<_;m++)Br.fromBufferAttribute(u,m),oh(Br,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function oh(i,t,e,n,s,r,o){const a=bc.distanceSqToPoint(i);if(a<e){const l=new R;bc.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class cd extends Pe{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ld extends Pe{constructor(t,e,n=Vi,s,r,o,a=$e,l=$e,c,h=rr,u=1){if(h!==rr&&h!==or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new jc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Cn extends be{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const o=[],a=[],l=[],c=[],h=e/2,u=Math.PI/2*t,d=e,f=2*u+d,m=n*2+r,_=s+1,g=new R,p=new R;for(let v=0;v<=m;v++){let M=0,x=0,T=0,E=0;if(v<=n){const S=v/n,b=S*Math.PI/2;x=-h-t*Math.cos(b),T=t*Math.sin(b),E=-t*Math.cos(b),M=S*u}else if(v<=n+r){const S=(v-n)/r;x=-h+S*e,T=t,E=0,M=u+S*d}else{const S=(v-n-r)/n,b=S*Math.PI/2;x=h+t*Math.sin(b),T=t*Math.cos(b),E=t*Math.sin(b),M=u+d+S*u}const C=Math.max(0,Math.min(1,M/f));let I=0;v===0?I=.5/s:v===m&&(I=-.5/s);for(let S=0;S<=s;S++){const b=S/s,P=b*Math.PI*2,O=Math.sin(P),z=Math.cos(P);p.x=-T*z,p.y=x,p.z=T*O,a.push(p.x,p.y,p.z),g.set(-T*z,E,T*O),g.normalize(),l.push(g.x,g.y,g.z),c.push(b+I,C)}if(v>0){const S=(v-1)*_;for(let b=0;b<s;b++){const P=S+b,O=S+b+1,z=v*_+b,V=v*_+b+1;o.push(P,O,z),o.push(O,V,z)}}}this.setIndex(o),this.setAttribute("position",new Wt(a,3)),this.setAttribute("normal",new Wt(l,3)),this.setAttribute("uv",new Wt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cn(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class bi extends be{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new R,h=new ut;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Wt(o,3)),this.setAttribute("normal",new Wt(a,3)),this.setAttribute("uv",new Wt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bi(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ue extends be{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let m=0;const _=[],g=n/2;let p=0;v(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Wt(u,3)),this.setAttribute("normal",new Wt(d,3)),this.setAttribute("uv",new Wt(f,2));function v(){const x=new R,T=new R;let E=0;const C=(e-t)/n;for(let I=0;I<=r;I++){const S=[],b=I/r,P=b*(e-t)+t;for(let O=0;O<=s;O++){const z=O/s,V=z*l+a,Y=Math.sin(V),q=Math.cos(V);T.x=P*Y,T.y=-b*n+g,T.z=P*q,u.push(T.x,T.y,T.z),x.set(Y,C,q).normalize(),d.push(x.x,x.y,x.z),f.push(z,1-b),S.push(m++)}_.push(S)}for(let I=0;I<s;I++)for(let S=0;S<r;S++){const b=_[S][I],P=_[S+1][I],O=_[S+1][I+1],z=_[S][I+1];(t>0||S!==0)&&(h.push(b,P,z),E+=3),(e>0||S!==r-1)&&(h.push(P,O,z),E+=3)}c.addGroup(p,E,0),p+=E}function M(x){const T=m,E=new ut,C=new R;let I=0;const S=x===!0?t:e,b=x===!0?1:-1;for(let O=1;O<=s;O++)u.push(0,g*b,0),d.push(0,b,0),f.push(.5,.5),m++;const P=m;for(let O=0;O<=s;O++){const V=O/s*l+a,Y=Math.cos(V),q=Math.sin(V);C.x=S*q,C.y=g*b,C.z=S*Y,u.push(C.x,C.y,C.z),d.push(0,b,0),E.x=Y*.5+.5,E.y=q*.5*b+.5,f.push(E.x,E.y),m++}for(let O=0;O<s;O++){const z=T+O,V=P+O;x===!0?h.push(V,V+1,z):h.push(V+1,V,z),I+=3}c.addGroup(p,I,x===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ue(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ce extends Ue{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Ce(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Rs extends be{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Wt(r,3)),this.setAttribute("normal",new Wt(r.slice(),3)),this.setAttribute("uv",new Wt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const M=new R,x=new R,T=new R;for(let E=0;E<e.length;E+=3)f(e[E+0],M),f(e[E+1],x),f(e[E+2],T),l(M,x,T,v)}function l(v,M,x,T){const E=T+1,C=[];for(let I=0;I<=E;I++){C[I]=[];const S=v.clone().lerp(x,I/E),b=M.clone().lerp(x,I/E),P=E-I;for(let O=0;O<=P;O++)O===0&&I===E?C[I][O]=S:C[I][O]=S.clone().lerp(b,O/P)}for(let I=0;I<E;I++)for(let S=0;S<2*(E-I)-1;S++){const b=Math.floor(S/2);S%2===0?(d(C[I][b+1]),d(C[I+1][b]),d(C[I][b])):(d(C[I][b+1]),d(C[I+1][b+1]),d(C[I+1][b]))}}function c(v){const M=new R;for(let x=0;x<r.length;x+=3)M.x=r[x+0],M.y=r[x+1],M.z=r[x+2],M.normalize().multiplyScalar(v),r[x+0]=M.x,r[x+1]=M.y,r[x+2]=M.z}function h(){const v=new R;for(let M=0;M<r.length;M+=3){v.x=r[M+0],v.y=r[M+1],v.z=r[M+2];const x=g(v)/2/Math.PI+.5,T=p(v)/Math.PI+.5;o.push(x,1-T)}m(),u()}function u(){for(let v=0;v<o.length;v+=6){const M=o[v+0],x=o[v+2],T=o[v+4],E=Math.max(M,x,T),C=Math.min(M,x,T);E>.9&&C<.1&&(M<.2&&(o[v+0]+=1),x<.2&&(o[v+2]+=1),T<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function f(v,M){const x=v*3;M.x=t[x+0],M.y=t[x+1],M.z=t[x+2]}function m(){const v=new R,M=new R,x=new R,T=new R,E=new ut,C=new ut,I=new ut;for(let S=0,b=0;S<r.length;S+=9,b+=6){v.set(r[S+0],r[S+1],r[S+2]),M.set(r[S+3],r[S+4],r[S+5]),x.set(r[S+6],r[S+7],r[S+8]),E.set(o[b+0],o[b+1]),C.set(o[b+2],o[b+3]),I.set(o[b+4],o[b+5]),T.copy(v).add(M).add(x).divideScalar(3);const P=g(T);_(E,b+0,v,P),_(C,b+2,M,P),_(I,b+4,x,P)}}function _(v,M,x,T){T<0&&v.x===1&&(o[M]=v.x-1),x.x===0&&x.z===0&&(o[M]=T/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rs(t.vertices,t.indices,t.radius,t.details)}}class zi extends Rs{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new zi(t.radius,t.detail)}}class li{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new ut:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new R,s=[],r=[],o=[],a=new R,l=new Rt;for(let f=0;f<=t;f++){const m=f/t;s[f]=this.getTangentAt(m,new R)}r[0]=new R,o[0]=new R;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Vt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Vt(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class hd extends li{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new ut){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Np extends hd{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function nl(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const kr=new R,ha=new nl,ua=new nl,da=new nl;class ho extends li{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new R){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(kr.subVectors(s[0],s[1]).add(s[0]),c=kr);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(kr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=kr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),ha.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,_,g),ua.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,_,g),da.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,_,g)}else this.curveType==="catmullrom"&&(ha.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),ua.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),da.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(ha.calc(l),ua.calc(l),da.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new R().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ah(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function Up(i,t){const e=1-i;return e*e*t}function Fp(i,t){return 2*(1-i)*i*t}function Op(i,t){return i*i*t}function Qs(i,t,e,n){return Up(i,t)+Fp(i,e)+Op(i,n)}function Bp(i,t){const e=1-i;return e*e*e*t}function kp(i,t){const e=1-i;return 3*e*e*i*t}function zp(i,t){return 3*(1-i)*i*i*t}function Hp(i,t){return i*i*i*t}function tr(i,t,e,n,s){return Bp(i,t)+kp(i,e)+zp(i,n)+Hp(i,s)}class Vp extends li{constructor(t=new ut,e=new ut,n=new ut,s=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ut){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(tr(t,s.x,r.x,o.x,a.x),tr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Gp extends li{constructor(t=new R,e=new R,n=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new R){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(tr(t,s.x,r.x,o.x,a.x),tr(t,s.y,r.y,o.y,a.y),tr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Wp extends li{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xp extends li{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qp extends li{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Qs(t,s.x,r.x,o.x),Qs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ud extends li{constructor(t=new R,e=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new R){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Qs(t,s.x,r.x,o.x),Qs(t,s.y,r.y,o.y),Qs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Kp extends li{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(ah(a,l.x,c.x,h.x,u.x),ah(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ut().fromArray(s))}return this}}var Yp=Object.freeze({__proto__:null,ArcCurve:Np,CatmullRomCurve3:ho,CubicBezierCurve:Vp,CubicBezierCurve3:Gp,EllipseCurve:hd,LineCurve:Wp,LineCurve3:Xp,QuadraticBezierCurve:qp,QuadraticBezierCurve3:ud,SplineCurve:Kp});class We extends Rs{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new We(t.radius,t.detail)}}class dr extends Rs{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new dr(t.radius,t.detail)}}class ai extends be{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],m=[],_=[],g=[];for(let p=0;p<h;p++){const v=p*d-o;for(let M=0;M<c;M++){const x=M*u-r;m.push(x,-v,0),_.push(0,0,1),g.push(M/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){const M=v+c*p,x=v+c*(p+1),T=v+1+c*(p+1),E=v+1+c*p;f.push(M,x,E),f.push(x,T,E)}this.setIndex(f),this.setAttribute("position",new Wt(m,3)),this.setAttribute("normal",new Wt(_,3)),this.setAttribute("uv",new Wt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ai(t.width,t.height,t.widthSegments,t.heightSegments)}}class Gi extends be{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let u=t;const d=(e-t)/s,f=new R,m=new ut;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){const p=r+g/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=d}for(let _=0;_<s;_++){const g=_*(n+1);for(let p=0;p<n;p++){const v=p+g,M=v,x=v+n+1,T=v+n+2,E=v+1;a.push(M,x,E),a.push(x,T,E)}}this.setIndex(a),this.setAttribute("position",new Wt(l,3)),this.setAttribute("normal",new Wt(c,3)),this.setAttribute("uv",new Wt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gi(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Fe extends be{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new R,d=new R,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){const v=[],M=p/n;let x=0;p===0&&o===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let T=0;T<=e;T++){const E=T/e;u.x=-t*Math.cos(s+E*r)*Math.sin(o+M*a),u.y=t*Math.cos(o+M*a),u.z=t*Math.sin(s+E*r)*Math.sin(o+M*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(E+x,1-M),v.push(c++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<e;v++){const M=h[p][v+1],x=h[p][v],T=h[p+1][v],E=h[p+1][v+1];(p!==0||o>0)&&f.push(M,x,E),(p!==n-1||l<Math.PI)&&f.push(x,T,E)}this.setIndex(f),this.setAttribute("position",new Wt(m,3)),this.setAttribute("normal",new Wt(_,3)),this.setAttribute("uv",new Wt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fe(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class il extends Rs{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new il(t.radius,t.detail)}}class dn extends be{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new R,u=new R,d=new R;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const _=m/s*r,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(_),u.y=(t+e*Math.cos(g))*Math.sin(_),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const _=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,v=(s+1)*f+m;o.push(_,g,v),o.push(g,p,v)}this.setIndex(o),this.setAttribute("position",new Wt(a,3)),this.setAttribute("normal",new Wt(l,3)),this.setAttribute("uv",new Wt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class yo extends be{constructor(t=new ud(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new R,l=new R,c=new ut;let h=new R;const u=[],d=[],f=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new Wt(u,3)),this.setAttribute("normal",new Wt(d,3)),this.setAttribute("uv",new Wt(f,2));function _(){for(let M=0;M<e;M++)g(M);g(r===!1?e:0),v(),p()}function g(M){h=t.getPointAt(M/e,h);const x=o.normals[M],T=o.binormals[M];for(let E=0;E<=s;E++){const C=E/s*Math.PI*2,I=Math.sin(C),S=-Math.cos(C);l.x=S*x.x+I*T.x,l.y=S*x.y+I*T.y,l.z=S*x.z+I*T.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let M=1;M<=e;M++)for(let x=1;x<=s;x++){const T=(s+1)*(M-1)+(x-1),E=(s+1)*M+(x-1),C=(s+1)*M+x,I=(s+1)*(M-1)+x;m.push(T,E,I),m.push(E,C,I)}}function v(){for(let M=0;M<=e;M++)for(let x=0;x<=s;x++)c.x=M/e,c.y=x/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new yo(new Yp[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class jp extends Oe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ze extends Hn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yu,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Wn extends Ze{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ut(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Vt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new yt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new yt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new yt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class $p extends Hn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Jp extends Hn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}function zr(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Zp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Qp(i){function t(s,r){return i[s]-i[r]}const e=i.length,n=new Array(e);for(let s=0;s!==e;++s)n[s]=s;return n.sort(t),n}function ch(i,t,e){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=e[r]*t;for(let l=0;l!==t;++l)s[o++]=i[a+l]}return s}function dd(i,t,e,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=i[s++];while(r!==void 0)}class fr{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,s=e[n],r=e[n-1];t:{e:{let o;n:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break e}o=e.length;break n}if(!(t>=r)){const a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break e}o=n,n=0;break n}break t}for(;n<o;){const a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class tm extends fr{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ls,endingEnd:ls}}intervalChanged_(t,e,n){const s=this.parameterPositions;let r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case hs:r=t,a=2*e-n;break;case go:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case hs:o=t,l=2*n-e;break;case go:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}const c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),_=m*m,g=_*m,p=-d*g+2*d*_-d*m,v=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*m+1,M=(-1-f)*g+(1.5+f)*_+.5*m,x=f*g-f*_;for(let T=0;T!==a;++T)r[T]=p*o[h+T]+v*o[c+T]+M*o[l+T]+x*o[u+T];return r}}class fd extends fr{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class em extends fr{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}}class Un{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=zr(e,this.TimeBufferType),this.values=zr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:zr(t.times,Array),values:zr(t.values,Array)};const s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new em(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new fd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new tm(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ar:e=this.InterpolantFactoryMethodDiscrete;break;case cr:e=this.InterpolantFactoryMethodLinear;break;case Bo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ar;case this.InterpolantFactoryMethodLinear:return cr;case this.InterpolantFactoryMethodSmooth:return Bo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Zp(s))for(let a=0,l=s.length;a!==l;++a){const c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Bo,r=t.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){const _=e[u+m];if(_!==e[d+m]||_!==e[f+m]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}}Un.prototype.ValueTypeName="";Un.prototype.TimeBufferType=Float32Array;Un.prototype.ValueBufferType=Float32Array;Un.prototype.DefaultInterpolation=cr;class Cs extends Un{constructor(t,e,n){super(t,e,n)}}Cs.prototype.ValueTypeName="bool";Cs.prototype.ValueBufferType=Array;Cs.prototype.DefaultInterpolation=ar;Cs.prototype.InterpolantFactoryMethodLinear=void 0;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;class pd extends Un{constructor(t,e,n,s){super(t,e,n,s)}}pd.prototype.ValueTypeName="color";class ws extends Un{constructor(t,e,n,s){super(t,e,n,s)}}ws.prototype.ValueTypeName="number";class nm extends fr{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e);let c=t*a;for(let h=c+a;c!==h;c+=4)un.slerpFlat(r,0,o,c-a,o,c,l);return r}}class Ts extends Un{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new nm(this.times,this.values,this.getValueSize(),t)}}Ts.prototype.ValueTypeName="quaternion";Ts.prototype.InterpolantFactoryMethodSmooth=void 0;class Ps extends Un{constructor(t,e,n){super(t,e,n)}}Ps.prototype.ValueTypeName="string";Ps.prototype.ValueBufferType=Array;Ps.prototype.DefaultInterpolation=ar;Ps.prototype.InterpolantFactoryMethodLinear=void 0;Ps.prototype.InterpolantFactoryMethodSmooth=void 0;class Es extends Un{constructor(t,e,n,s){super(t,e,n,s)}}Es.prototype.ValueTypeName="vector";class wc{constructor(t="",e=-1,n=[],s=Kc){this.name=t,this.tracks=n,this.duration=e,this.blendMode=s,this.uuid=Ln(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,s=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(sm(n[o]).scale(s));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){const e=[],n=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,o=n.length;r!==o;++r)e.push(Un.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(t,e,n,s){const r=e.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=Qp(l);l=ch(l,1,h),c=ch(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new ws(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const s=t;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===e)return n[s];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){const c=t[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(c)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,n));return o}static parseAnimation(t,e){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,m,_){if(f.length!==0){const g=[],p=[];dd(f,g,p,m),g.length!==0&&_.push(new u(d,g,p))}},s=[],r=t.name||"default",o=t.fps||30,a=t.blendMode;let l=t.length||-1;const c=t.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let _=0;_<d[m].morphTargets.length;_++)f[d[m].morphTargets[_]]=-1;for(const _ in f){const g=[],p=[];for(let v=0;v!==d[m].morphTargets.length;++v){const M=d[m];g.push(M.time),p.push(M.morphTarget===_?1:0)}s.push(new ws(".morphTargetInfluence["+_+"]",g,p))}l=f.length*o}else{const f=".bones["+e[u].name+"]";n(Es,f+".position",d,"pos",s),n(Ts,f+".quaternion",d,"rot",s),n(Es,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,s=t.length;n!==s;++n){const r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function im(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ws;case"vector":case"vector2":case"vector3":case"vector4":return Es;case"color":return pd;case"quaternion":return Ts;case"bool":case"boolean":return Cs;case"string":return Ps}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function sm(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=im(i.type);if(i.times===void 0){const e=[],n=[];dd(i.keys,e,n,"value"),i.times=e,i.values=n}return t.parse!==void 0?t.parse(i):new t(i.name,i.times,i.values,i.interpolation)}const ni={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class rm{constructor(t,e,n){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const om=new rm;class Is{constructor(t){this.manager=t!==void 0?t:om,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}Is.DEFAULT_MATERIAL_NAME="__DEFAULT";const Jn={};class am extends Error{constructor(t,e){super(t),this.response=e}}class md extends Is{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=ni.get(`file:${t}`);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(Jn[t]!==void 0){Jn[t].push({onLoad:e,onProgress:n,onError:s});return}Jn[t]=[],Jn[t].push({onLoad:e,onProgress:n,onError:s});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Jn[t],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let _=0;const g=new ReadableStream({start(p){v();function v(){u.read().then(({done:M,value:x})=>{if(M)p.close();else{_+=x.byteLength;const T=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let E=0,C=h.length;E<C;E++){const I=h[E];I.onProgress&&I.onProgress(T)}p.enqueue(x),v()}},M=>{p.error(M)})}}});return new Response(g)}else throw new am(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{ni.add(`file:${t}`,c);const h=Jn[t];delete Jn[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Jn[t];if(h===void 0)throw this.manager.itemError(t),c;delete Jn[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const os=new WeakMap;class cm extends Is{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=ni.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let u=os.get(o);u===void 0&&(u=[],os.set(o,u)),u.push({onLoad:e,onError:s})}return o}const a=lr("img");function l(){h(),e&&e(this);const u=os.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}os.delete(this),r.manager.itemEnd(t)}function c(u){h(),s&&s(u),ni.remove(`image:${t}`);const d=os.get(this)||[];for(let f=0;f<d.length;f++){const m=d[f];m.onError&&m.onError(u)}os.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),ni.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}}class lm extends Is{constructor(t){super(t)}load(t,e,n,s){const r=new Pe,o=new cm(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class Co extends pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new yt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class hm extends Co{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new yt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const fa=new Rt,lh=new R,hh=new R;class sl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.mapType=Gn,this.map=null,this.mapPass=null,this.matrix=new Rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ur,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new Zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;lh.setFromMatrixPosition(t.matrixWorld),e.position.copy(lh),hh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(hh),e.updateMatrixWorld(),fa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fa,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(fa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class um extends sl{constructor(){super(new Ye(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=ys*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class dm extends Co{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new um}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const uh=new Rt,Vs=new R,pa=new R;class fm extends sl{constructor(){super(new Ye(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ut(4,2),this._viewportCount=6,this._viewports=[new Zt(2,1,1,1),new Zt(0,1,1,1),new Zt(3,1,1,1),new Zt(1,1,1,1),new Zt(3,0,1,1),new Zt(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Vs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Vs),pa.copy(n.position),pa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(pa),n.updateMatrixWorld(),s.makeTranslation(-Vs.x,-Vs.y,-Vs.z),uh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uh,n.coordinateSystem,n.reversedDepth)}}class ci extends Co{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new fm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Po extends nd{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class pm extends sl{constructor(){super(new Po(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class So extends Co{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.shadow=new pm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class er{static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}const ma=new WeakMap;class mm extends Is{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=ni.get(`image-bitmap:${t}`);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(c=>{if(ma.has(o)===!0)s&&s(ma.get(o)),r.manager.itemError(t),r.manager.itemEnd(t);else return e&&e(c),r.manager.itemEnd(t),c});return}return setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(t,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return ni.add(`image-bitmap:${t}`,c),e&&e(c),r.manager.itemEnd(t),c}).catch(function(c){s&&s(c),ma.set(l,c),ni.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});ni.add(`image-bitmap:${t}`,l),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class gm extends Ye{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class gd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class _m{constructor(t,e,n){this.binding=t,this.valueSize=n;let s,r,o;switch(e){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,s=this.valueSize,r=t*s+s;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=e}else{o+=e;const a=e/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,s,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,s=t*e+e,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=e*this._origIndex;this._mixBufferRegion(n,s,l,1-r,e)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){a.setValue(n,s);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,s=n*this._origIndex;t.getValue(e,s);for(let r=n,o=s;r!==o;++r)e[r]=e[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)t[e+o]=t[n+o]}_slerp(t,e,n,s){un.slerpFlat(t,e,t,e,t,n,s)}_slerpAdditive(t,e,n,s,r){const o=this._workIndex*r;un.multiplyQuaternionsFlat(t,o,t,e,t,n),un.slerpFlat(t,e,t,e,t,o,s)}_lerp(t,e,n,s,r){const o=1-s;for(let a=0;a!==r;++a){const l=e+a;t[l]=t[l]*o+t[n+a]*s}}_lerpAdditive(t,e,n,s,r){for(let o=0;o!==r;++o){const a=e+o;t[a]=t[a]+t[n+o]*s}}}const rl="\\[\\]\\.:\\/",vm=new RegExp("["+rl+"]","g"),ol="[^"+rl+"]",xm="[^"+rl.replace("\\.","")+"]",Mm=/((?:WC+[\/:])*)/.source.replace("WC",ol),ym=/(WCOD+)?/.source.replace("WCOD",xm),Sm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ol),bm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ol),wm=new RegExp("^"+Mm+ym+Sm+bm+"$"),Tm=["material","materials","bones","map"];class Em{constructor(t,e,n){const s=n||ee.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class ee{constructor(t,e,n){this.path=e,this.parsedPath=n||ee.parseTrackName(e),this.node=ee.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new ee.Composite(t,e,n):new ee(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(vm,"")}static parseTrackName(t){const e=wm.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Tm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===e||a.uuid===e)return a;const l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,s=e.propertyName;let r=e.propertyIndex;if(t||(t=ee.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}const o=t[s];if(o===void 0){const c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ee.Composite=Em;ee.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ee.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ee.prototype.GetterByBindingType=[ee.prototype._getValue_direct,ee.prototype._getValue_array,ee.prototype._getValue_arrayElement,ee.prototype._getValue_toArray];ee.prototype.SetterByBindingTypeAndVersioning=[[ee.prototype._setValue_direct,ee.prototype._setValue_direct_setNeedsUpdate,ee.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_array,ee.prototype._setValue_array_setNeedsUpdate,ee.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_arrayElement,ee.prototype._setValue_arrayElement_setNeedsUpdate,ee.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_fromArray,ee.prototype._setValue_fromArray_setNeedsUpdate,ee.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Am{constructor(t,e,n=null,s=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=s;const r=e.tracks,o=r.length,a=new Array(o),l={endingStart:ls,endingEnd:ls};for(let c=0;c!==o;++c){const h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=qc,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n=!1){if(t.fadeOut(e),this.fadeIn(e),n===!0){const s=this._clip.duration,r=t._clip.duration,o=r/s,a=s/r;t.warp(1,o,e),this.warp(a,1,e)}return this}crossFadeTo(t,e,n=!1){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const s=this._mixer,r=s.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=t/o,c[1]=e/o,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,s){if(!this.enabled){this._updateWeight(t);return}const r=this._startTime;if(r!==null){const l=(t-r)*n;l<0||n===0?e=0:(this._startTime=null,e=n*l)}e*=this._updateTimeScale(t);const o=this._updateTime(e),a=this._updateWeight(t);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case yf:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Kc:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(s,a)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const s=n.evaluate(t)[0];e*=s,t>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const s=n.evaluate(t)[0];e*=s,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let s=this.time+t,r=this._loopCount;const o=n===Mf;if(t===0)return r===-1?s:o&&(r&1)===1?e-s:s;if(n===Xc){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(s>=e)s=e;else if(s<0)s=0;else{this.time=s;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=e||s<0){const a=Math.floor(s/e);s-=e*a,r+=Math.abs(a);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=t>0?e:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){const c=t<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=s;if(o&&(r&1)===1)return e-s}return s}_setEndings(t,e,n){const s=this._interpolantSettings;n?(s.endingStart=hs,s.endingEnd=hs):(t?s.endingStart=this.zeroSlopeAtStart?hs:ls:s.endingStart=go,e?s.endingEnd=this.zeroSlopeAtEnd?hs:ls:s.endingEnd=go)}_scheduleFading(t,e,n){const s=this._mixer,r=s.time;let o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=e,a[1]=r+t,l[1]=n,this}}const Rm=new Float32Array(1);class Cm extends Wi{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,s=t._clip.tracks,r=s.length,o=t._propertyBindings,a=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){const d=s[u],f=d.name;let m=h[f];if(m!==void 0)++m.referenceCount,o[u]=m;else{if(m=o[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}const _=e&&e._propertyBindings[u].binding.parsedPath;m=new _m(ee.create(n,f,_),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),o[u]=m}a[u].resultBuffer=m.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,s=t._clip.uuid,r=this._actionsByClip[s];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,s,n)}const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const s=this._actions,r=this._actionsByClip;let o=r[e];if(o===void 0)o={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=o;else{const a=o.knownActions;t._byClipCacheIndex=a.length,a.push(t)}t._cacheIndex=s.length,s.push(t),o.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],s=t._cacheIndex;n._cacheIndex=s,e[s]=n,e.pop(),t._cacheIndex=null;const r=t._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;const u=a.actionByRoot,d=(t._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){const r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,s=this._nActiveActions++,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,s=--this._nActiveActions,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){const s=this._bindingsByRootAndName,r=this._bindings;let o=s[e];o===void 0&&(o={},s[e]=o),o[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,s=this._nActiveBindings++,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,s=--this._nActiveBindings,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new fd(new Float32Array(2),new Float32Array(2),1,Rm),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,s=--this._nActiveControlInterpolants,r=e[s];t.__cacheIndex=s,e[s]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){const s=e||this._root,r=s.uuid;let o=typeof t=="string"?wc.findByName(s,t):t;const a=o!==null?o.uuid:t,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Kc),l!==void 0){const u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new Am(this,o,e,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(t,e){const n=e||this._root,s=n.uuid,r=typeof t=="string"?wc.findByName(n,t):t,o=r?r.uuid:t,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,s=this.time+=t,r=Math.sign(t),o=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(s,t,r,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){const o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const s=this._bindingsByRootAndName,r=s[e];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const dh=new Rt;class Pm{constructor(t,e,n=0,s=1/0){this.ray=new hr(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new $c,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return dh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dh),this}intersectObject(t,e=!0,n=[]){return Tc(t,this,n,e),n.sort(fh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Tc(t[s],this,n,e);return n.sort(fh),n}}function fh(i,t){return i.distance-t.distance}function Tc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Tc(r[o],t,e,!0)}}function ph(i,t,e,n){const s=Im(n);switch(e){case Gu:return i*t;case Hc:return i*t/s.components*s.byteLength;case Vc:return i*t/s.components*s.byteLength;case Xu:return i*t*2/s.components*s.byteLength;case Gc:return i*t*2/s.components*s.byteLength;case Wu:return i*t*3/s.components*s.byteLength;case vn:return i*t*4/s.components*s.byteLength;case Wc:return i*t*4/s.components*s.byteLength;case ro:case oo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ao:case co:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ja:case Ja:return Math.max(i,16)*Math.max(t,8)/4;case Ya:case $a:return Math.max(i,8)*Math.max(t,8)/2;case Za:case Qa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case tc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ec:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case nc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ic:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case sc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case rc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case oc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ac:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case cc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case lc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case hc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case uc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case dc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case fc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case pc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case lo:case mc:case gc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case qu:case _c:return Math.ceil(i/4)*Math.ceil(t/4)*8;case vc:case xc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Im(i){switch(i){case Gn:case zu:return{byteLength:1,components:1};case ir:case Hu:case si:return{byteLength:2,components:1};case kc:case zc:return{byteLength:2,components:4};case Vi:case Bc:case Pn:return{byteLength:4,components:1};case Vu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fc);function _d(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Lm(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],_=u[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const _=u[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Dm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Um=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Om=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,km=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,zm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Vm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,qm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Km=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ym=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$m=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Qm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,eg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ng=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ig=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,sg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,rg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,og=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ag=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lg="gl_FragColor = linearToOutputTexel( gl_FragColor );",hg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ug=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,dg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,fg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,pg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_g=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,yg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Tg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Eg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ag=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ig=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Lg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Dg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ng=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ug=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Fg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Og=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Vg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,jg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$g=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Jg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Zg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,e0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,n0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,i0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,s0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,r0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,o0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,a0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,c0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,l0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,h0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,u0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,d0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,f0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,p0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,m0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,g0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,v0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,x0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,M0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,y0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,S0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,b0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,T0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,E0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,A0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,R0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,C0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,P0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,I0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const L0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,D0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,U0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,F0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,O0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,k0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,z0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,H0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,V0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,G0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,X0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,q0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,K0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Y0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,j0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,J0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Q0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,t_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,e_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,i_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,r_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,a_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,c_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,l_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,h_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,u_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:Dm,alphahash_pars_fragment:Nm,alphamap_fragment:Um,alphamap_pars_fragment:Fm,alphatest_fragment:Om,alphatest_pars_fragment:Bm,aomap_fragment:km,aomap_pars_fragment:zm,batching_pars_vertex:Hm,batching_vertex:Vm,begin_vertex:Gm,beginnormal_vertex:Wm,bsdfs:Xm,iridescence_fragment:qm,bumpmap_pars_fragment:Km,clipping_planes_fragment:Ym,clipping_planes_pars_fragment:jm,clipping_planes_pars_vertex:$m,clipping_planes_vertex:Jm,color_fragment:Zm,color_pars_fragment:Qm,color_pars_vertex:tg,color_vertex:eg,common:ng,cube_uv_reflection_fragment:ig,defaultnormal_vertex:sg,displacementmap_pars_vertex:rg,displacementmap_vertex:og,emissivemap_fragment:ag,emissivemap_pars_fragment:cg,colorspace_fragment:lg,colorspace_pars_fragment:hg,envmap_fragment:ug,envmap_common_pars_fragment:dg,envmap_pars_fragment:fg,envmap_pars_vertex:pg,envmap_physical_pars_fragment:Tg,envmap_vertex:mg,fog_vertex:gg,fog_pars_vertex:_g,fog_fragment:vg,fog_pars_fragment:xg,gradientmap_pars_fragment:Mg,lightmap_pars_fragment:yg,lights_lambert_fragment:Sg,lights_lambert_pars_fragment:bg,lights_pars_begin:wg,lights_toon_fragment:Eg,lights_toon_pars_fragment:Ag,lights_phong_fragment:Rg,lights_phong_pars_fragment:Cg,lights_physical_fragment:Pg,lights_physical_pars_fragment:Ig,lights_fragment_begin:Lg,lights_fragment_maps:Dg,lights_fragment_end:Ng,logdepthbuf_fragment:Ug,logdepthbuf_pars_fragment:Fg,logdepthbuf_pars_vertex:Og,logdepthbuf_vertex:Bg,map_fragment:kg,map_pars_fragment:zg,map_particle_fragment:Hg,map_particle_pars_fragment:Vg,metalnessmap_fragment:Gg,metalnessmap_pars_fragment:Wg,morphinstance_vertex:Xg,morphcolor_vertex:qg,morphnormal_vertex:Kg,morphtarget_pars_vertex:Yg,morphtarget_vertex:jg,normal_fragment_begin:$g,normal_fragment_maps:Jg,normal_pars_fragment:Zg,normal_pars_vertex:Qg,normal_vertex:t0,normalmap_pars_fragment:e0,clearcoat_normal_fragment_begin:n0,clearcoat_normal_fragment_maps:i0,clearcoat_pars_fragment:s0,iridescence_pars_fragment:r0,opaque_fragment:o0,packing:a0,premultiplied_alpha_fragment:c0,project_vertex:l0,dithering_fragment:h0,dithering_pars_fragment:u0,roughnessmap_fragment:d0,roughnessmap_pars_fragment:f0,shadowmap_pars_fragment:p0,shadowmap_pars_vertex:m0,shadowmap_vertex:g0,shadowmask_pars_fragment:_0,skinbase_vertex:v0,skinning_pars_vertex:x0,skinning_vertex:M0,skinnormal_vertex:y0,specularmap_fragment:S0,specularmap_pars_fragment:b0,tonemapping_fragment:w0,tonemapping_pars_fragment:T0,transmission_fragment:E0,transmission_pars_fragment:A0,uv_pars_fragment:R0,uv_pars_vertex:C0,uv_vertex:P0,worldpos_vertex:I0,background_vert:L0,background_frag:D0,backgroundCube_vert:N0,backgroundCube_frag:U0,cube_vert:F0,cube_frag:O0,depth_vert:B0,depth_frag:k0,distanceRGBA_vert:z0,distanceRGBA_frag:H0,equirect_vert:V0,equirect_frag:G0,linedashed_vert:W0,linedashed_frag:X0,meshbasic_vert:q0,meshbasic_frag:K0,meshlambert_vert:Y0,meshlambert_frag:j0,meshmatcap_vert:$0,meshmatcap_frag:J0,meshnormal_vert:Z0,meshnormal_frag:Q0,meshphong_vert:t_,meshphong_frag:e_,meshphysical_vert:n_,meshphysical_frag:i_,meshtoon_vert:s_,meshtoon_frag:r_,points_vert:o_,points_frag:a_,shadow_vert:c_,shadow_frag:l_,sprite_vert:h_,sprite_frag:u_},rt={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},Bn={basic:{uniforms:Ke([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Ke([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new yt(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Ke([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Ke([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Ke([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new yt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Ke([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Ke([rt.points,rt.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Ke([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Ke([rt.common,rt.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Ke([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Ke([rt.sprite,rt.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:Ke([rt.common,rt.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:Ke([rt.lights,rt.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};Bn.physical={uniforms:Ke([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const Hr={r:0,b:0,g:0},Pi=new Mn,d_=new Rt;function f_(i,t,e,n,s,r,o){const a=new yt(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function m(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?e:t).get(x)),x}function _(M){let x=!1;const T=m(M);T===null?p(a,l):T&&T.isColor&&(p(T,1),x=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(M,x){const T=m(x);T&&(T.isCubeTexture||T.mapping===Ro)?(h===void 0&&(h=new $(new Ee(1,1,1),new Oe({name:"BackgroundCubeMaterial",uniforms:Ss(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,C,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Pi.copy(x.backgroundRotation),Pi.x*=-1,Pi.y*=-1,Pi.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Pi.y*=-1,Pi.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(d_.makeRotationFromEuler(Pi)),h.material.toneMapped=Kt.getTransfer(T.colorSpace)!==ne,(u!==T||d!==T.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new $(new ai(2,2),new Oe({name:"BackgroundMaterial",uniforms:Ss(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(T.colorSpace)!==ne,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||d!==T.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,x){M.getRGB(Hr,ed(i)),n.buffers.color.setClear(Hr.r,Hr.g,Hr.b,x,o)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,x=1){a.set(M),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(a,l)},render:_,addToRenderList:g,dispose:v}}function p_(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(b,P,O,z,V){let Y=!1;const q=u(z,O,P);r!==q&&(r=q,c(r.object)),Y=f(b,z,O,V),Y&&m(b,z,O,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,x(b,P,O,z),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return i.createVertexArray()}function c(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function u(b,P,O){const z=O.wireframe===!0;let V=n[b.id];V===void 0&&(V={},n[b.id]=V);let Y=V[P.id];Y===void 0&&(Y={},V[P.id]=Y);let q=Y[z];return q===void 0&&(q=d(l()),Y[z]=q),q}function d(b){const P=[],O=[],z=[];for(let V=0;V<e;V++)P[V]=0,O[V]=0,z[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:z,object:b,attributes:{},index:null}}function f(b,P,O,z){const V=r.attributes,Y=P.attributes;let q=0;const j=O.getAttributes();for(const H in j)if(j[H].location>=0){const dt=V[H];let wt=Y[H];if(wt===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(wt=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(wt=b.instanceColor)),dt===void 0||dt.attribute!==wt||wt&&dt.data!==wt.data)return!0;q++}return r.attributesNum!==q||r.index!==z}function m(b,P,O,z){const V={},Y=P.attributes;let q=0;const j=O.getAttributes();for(const H in j)if(j[H].location>=0){let dt=Y[H];dt===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(dt=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(dt=b.instanceColor));const wt={};wt.attribute=dt,dt&&dt.data&&(wt.data=dt.data),V[H]=wt,q++}r.attributes=V,r.attributesNum=q,r.index=z}function _(){const b=r.newAttributes;for(let P=0,O=b.length;P<O;P++)b[P]=0}function g(b){p(b,0)}function p(b,P){const O=r.newAttributes,z=r.enabledAttributes,V=r.attributeDivisors;O[b]=1,z[b]===0&&(i.enableVertexAttribArray(b),z[b]=1),V[b]!==P&&(i.vertexAttribDivisor(b,P),V[b]=P)}function v(){const b=r.newAttributes,P=r.enabledAttributes;for(let O=0,z=P.length;O<z;O++)P[O]!==b[O]&&(i.disableVertexAttribArray(O),P[O]=0)}function M(b,P,O,z,V,Y,q){q===!0?i.vertexAttribIPointer(b,P,O,V,Y):i.vertexAttribPointer(b,P,O,z,V,Y)}function x(b,P,O,z){_();const V=z.attributes,Y=O.getAttributes(),q=P.defaultAttributeValues;for(const j in Y){const H=Y[j];if(H.location>=0){let ot=V[j];if(ot===void 0&&(j==="instanceMatrix"&&b.instanceMatrix&&(ot=b.instanceMatrix),j==="instanceColor"&&b.instanceColor&&(ot=b.instanceColor)),ot!==void 0){const dt=ot.normalized,wt=ot.itemSize,zt=t.get(ot);if(zt===void 0)continue;const ue=zt.buffer,oe=zt.type,X=zt.bytesPerElement,at=oe===i.INT||oe===i.UNSIGNED_INT||ot.gpuType===Bc;if(ot.isInterleavedBufferAttribute){const it=ot.data,Ct=it.stride,Pt=ot.offset;if(it.isInstancedInterleavedBuffer){for(let Ut=0;Ut<H.locationSize;Ut++)p(H.location+Ut,it.meshPerAttribute);b.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let Ut=0;Ut<H.locationSize;Ut++)g(H.location+Ut);i.bindBuffer(i.ARRAY_BUFFER,ue);for(let Ut=0;Ut<H.locationSize;Ut++)M(H.location+Ut,wt/H.locationSize,oe,dt,Ct*X,(Pt+wt/H.locationSize*Ut)*X,at)}else{if(ot.isInstancedBufferAttribute){for(let it=0;it<H.locationSize;it++)p(H.location+it,ot.meshPerAttribute);b.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let it=0;it<H.locationSize;it++)g(H.location+it);i.bindBuffer(i.ARRAY_BUFFER,ue);for(let it=0;it<H.locationSize;it++)M(H.location+it,wt/H.locationSize,oe,dt,wt*X,wt/H.locationSize*it*X,at)}}else if(q!==void 0){const dt=q[j];if(dt!==void 0)switch(dt.length){case 2:i.vertexAttrib2fv(H.location,dt);break;case 3:i.vertexAttrib3fv(H.location,dt);break;case 4:i.vertexAttrib4fv(H.location,dt);break;default:i.vertexAttrib1fv(H.location,dt)}}}}v()}function T(){I();for(const b in n){const P=n[b];for(const O in P){const z=P[O];for(const V in z)h(z[V].object),delete z[V];delete P[O]}delete n[b]}}function E(b){if(n[b.id]===void 0)return;const P=n[b.id];for(const O in P){const z=P[O];for(const V in z)h(z[V].object),delete z[V];delete P[O]}delete n[b.id]}function C(b){for(const P in n){const O=n[P];if(O[b.id]===void 0)continue;const z=O[b.id];for(const V in z)h(z[V].object),delete z[V];delete O[b.id]}}function I(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:S,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function m_(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_]*d[_];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function g_(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==vn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const I=C===si&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Gn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Pn&&!I)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:T,maxSamples:E}}function __(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Ui,a=new Bt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{const v=r?0:n,M=v*4;let x=p.clippingState||null;l.value=x,x=h(m,d,M,f);for(let T=0;T!==M;++T)x[T]=e[T];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=l.value,m!==!0||g===null){const p=f+_*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let M=0,x=f;M!==_;++M,x+=4)o.copy(u[M]).applyMatrix4(v,a),o.normal.toArray(g,x),g[x+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function v_(i){let t=new WeakMap;function e(o,a){return a===qa?o.mapping=xs:a===Ka&&(o.mapping=Ms),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===qa||a===Ka)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Mp(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const us=4,mh=[.125,.215,.35,.446,.526,.582],Bi=20,ga=new Po,gh=new yt;let _a=null,va=0,xa=0,Ma=!1;const Fi=(1+Math.sqrt(5))/2,as=1/Fi,_h=[new R(-Fi,as,0),new R(Fi,as,0),new R(-as,0,Fi),new R(as,0,Fi),new R(0,Fi,-as),new R(0,Fi,as),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],x_=new R;class vh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=x_}=r;_a=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),xa=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(_a,va,xa),this._renderer.xr.enabled=Ma,t.scissorTest=!1,Vr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===xs||t.mapping===Ms?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_a=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),xa=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:si,format:vn,colorSpace:Qe,depthBuffer:!1},s=xh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=M_(r)),this._blurMaterial=y_(r,t,e)}return s}_compileMaterial(t){const e=new $(this._lodPlanes[0],t);this._renderer.compile(e,ga)}_sceneToCubeUV(t,e,n,s,r){const l=new Ye(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(gh),u.toneMapping=Si,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const _=new Nt({name:"PMREM.Background",side:je,depthWrite:!1,depthTest:!1}),g=new $(new Ee,_);let p=!1;const v=t.background;v?v.isColor&&(_.color.copy(v),t.background=null,p=!0):(_.color.copy(gh),p=!0);for(let M=0;M<6;M++){const x=M%3;x===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[M],r.y,r.z)):x===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[M]));const T=this._cubeSize;Vr(s,x*T,M>2?T:0,T,T),u.setRenderTarget(s),p&&u.render(g,l),u.render(t,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=v}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===xs||t.mapping===Ms;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new $(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Vr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ga)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=_h[(s-r-1)%_h.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new $(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Bi-1),_=r/m,g=isFinite(r)?1+Math.floor(h*_):Bi;g>Bi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Bi}`);const p=[];let v=0;for(let C=0;C<Bi;++C){const I=C/_,S=Math.exp(-I*I/2);p.push(S),C===0?v+=S:C<g&&(v+=2*S)}for(let C=0;C<p.length;C++)p[C]=p[C]/v;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:M}=this;d.dTheta.value=m,d.mipInt.value=M-n;const x=this._sizeLods[s],T=3*x*(s>M-us?s-M+us:0),E=4*(this._cubeSize-x);Vr(e,T,E,3*x,2*x),l.setRenderTarget(e),l.render(u,ga)}}function M_(i){const t=[],e=[],n=[];let s=i;const r=i-us+1+mh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-us?l=mh[o-i+us-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,_=3,g=2,p=1,v=new Float32Array(_*m*f),M=new Float32Array(g*m*f),x=new Float32Array(p*m*f);for(let E=0;E<f;E++){const C=E%3*2/3-1,I=E>2?0:-1,S=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];v.set(S,_*m*E),M.set(d,g*m*E);const b=[E,E,E,E,E,E];x.set(b,p*m*E)}const T=new be;T.setAttribute("position",new Je(v,_)),T.setAttribute("uv",new Je(M,g)),T.setAttribute("faceIndex",new Je(x,p)),t.push(T),s>us&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function xh(i,t,e){const n=new Dn(i,t,e);return n.texture.mapping=Ro,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Vr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function y_(i,t,e){const n=new Float32Array(Bi),s=new R(0,1,0);return new Oe({name:"SphericalGaussianBlur",defines:{n:Bi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Mh(){return new Oe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function yh(){return new Oe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function al(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function S_(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===qa||l===Ka,h=l===xs||l===Ms;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new vh(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new vh(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function b_(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ds("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function w_(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,m=u.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let M=0,x=v.length;M<x;M+=3){const T=v[M+0],E=v[M+1],C=v[M+2];d.push(T,E,E,C,C,T)}}else if(m!==void 0){const v=m.array;_=m.version;for(let M=0,x=v.length/3-1;M<x;M+=3){const T=M+0,E=M+1,C=M+2;d.push(T,E,E,C,C,T)}}else return;const g=new($u(d)?td:Qu)(d,1);g.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function T_(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*o,m),e.update(f,n,m))}function h(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function u(d,f,m,_){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,m);let p=0;for(let v=0;v<m;v++)p+=f[v]*_[v];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function E_(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function A_(i,t,e){const n=new WeakMap,s=new Zt;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let b=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",b)};var f=b;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let x=0;m===!0&&(x=1),_===!0&&(x=2),g===!0&&(x=3);let T=a.attributes.position.count*x,E=1;T>t.maxTextureSize&&(E=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const C=new Float32Array(T*E*4*u),I=new Ju(C,T,E,u);I.type=Pn,I.needsUpdate=!0;const S=x*4;for(let P=0;P<u;P++){const O=p[P],z=v[P],V=M[P],Y=T*E*4*P;for(let q=0;q<O.count;q++){const j=q*S;m===!0&&(s.fromBufferAttribute(O,q),C[Y+j+0]=s.x,C[Y+j+1]=s.y,C[Y+j+2]=s.z,C[Y+j+3]=0),_===!0&&(s.fromBufferAttribute(z,q),C[Y+j+4]=s.x,C[Y+j+5]=s.y,C[Y+j+6]=s.z,C[Y+j+7]=0),g===!0&&(s.fromBufferAttribute(V,q),C[Y+j+8]=s.x,C[Y+j+9]=s.y,C[Y+j+10]=s.z,C[Y+j+11]=V.itemSize===4?s.w:1)}}d={count:u,texture:I,size:new ut(T,E)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const _=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function R_(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const vd=new Pe,Sh=new ld(1,1),xd=new Ju,Md=new sp,yd=new id,bh=[],wh=[],Th=new Float32Array(16),Eh=new Float32Array(9),Ah=new Float32Array(4);function Ls(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=bh[s];if(r===void 0&&(r=new Float32Array(s),bh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ie(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Le(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Io(i,t){let e=wh[t];e===void 0&&(e=new Int32Array(t),wh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function C_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function P_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2fv(this.addr,t),Le(e,t)}}function I_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ie(e,t))return;i.uniform3fv(this.addr,t),Le(e,t)}}function L_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4fv(this.addr,t),Le(e,t)}}function D_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(Ie(e,n))return;Ah.set(n),i.uniformMatrix2fv(this.addr,!1,Ah),Le(e,n)}}function N_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(Ie(e,n))return;Eh.set(n),i.uniformMatrix3fv(this.addr,!1,Eh),Le(e,n)}}function U_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(Ie(e,n))return;Th.set(n),i.uniformMatrix4fv(this.addr,!1,Th),Le(e,n)}}function F_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function O_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2iv(this.addr,t),Le(e,t)}}function B_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;i.uniform3iv(this.addr,t),Le(e,t)}}function k_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4iv(this.addr,t),Le(e,t)}}function z_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function H_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2uiv(this.addr,t),Le(e,t)}}function V_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;i.uniform3uiv(this.addr,t),Le(e,t)}}function G_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4uiv(this.addr,t),Le(e,t)}}function W_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Sh.compareFunction=ju,r=Sh):r=vd,e.setTexture2D(t||r,s)}function X_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Md,s)}function q_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||yd,s)}function K_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||xd,s)}function Y_(i){switch(i){case 5126:return C_;case 35664:return P_;case 35665:return I_;case 35666:return L_;case 35674:return D_;case 35675:return N_;case 35676:return U_;case 5124:case 35670:return F_;case 35667:case 35671:return O_;case 35668:case 35672:return B_;case 35669:case 35673:return k_;case 5125:return z_;case 36294:return H_;case 36295:return V_;case 36296:return G_;case 35678:case 36198:case 36298:case 36306:case 35682:return W_;case 35679:case 36299:case 36307:return X_;case 35680:case 36300:case 36308:case 36293:return q_;case 36289:case 36303:case 36311:case 36292:return K_}}function j_(i,t){i.uniform1fv(this.addr,t)}function $_(i,t){const e=Ls(t,this.size,2);i.uniform2fv(this.addr,e)}function J_(i,t){const e=Ls(t,this.size,3);i.uniform3fv(this.addr,e)}function Z_(i,t){const e=Ls(t,this.size,4);i.uniform4fv(this.addr,e)}function Q_(i,t){const e=Ls(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function tv(i,t){const e=Ls(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function ev(i,t){const e=Ls(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function nv(i,t){i.uniform1iv(this.addr,t)}function iv(i,t){i.uniform2iv(this.addr,t)}function sv(i,t){i.uniform3iv(this.addr,t)}function rv(i,t){i.uniform4iv(this.addr,t)}function ov(i,t){i.uniform1uiv(this.addr,t)}function av(i,t){i.uniform2uiv(this.addr,t)}function cv(i,t){i.uniform3uiv(this.addr,t)}function lv(i,t){i.uniform4uiv(this.addr,t)}function hv(i,t,e){const n=this.cache,s=t.length,r=Io(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||vd,r[o])}function uv(i,t,e){const n=this.cache,s=t.length,r=Io(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Md,r[o])}function dv(i,t,e){const n=this.cache,s=t.length,r=Io(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||yd,r[o])}function fv(i,t,e){const n=this.cache,s=t.length,r=Io(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||xd,r[o])}function pv(i){switch(i){case 5126:return j_;case 35664:return $_;case 35665:return J_;case 35666:return Z_;case 35674:return Q_;case 35675:return tv;case 35676:return ev;case 5124:case 35670:return nv;case 35667:case 35671:return iv;case 35668:case 35672:return sv;case 35669:case 35673:return rv;case 5125:return ov;case 36294:return av;case 36295:return cv;case 36296:return lv;case 35678:case 36198:case 36298:case 36306:case 35682:return hv;case 35679:case 36299:case 36307:return uv;case 35680:case 36300:case 36308:case 36293:return dv;case 36289:case 36303:case 36311:case 36292:return fv}}class mv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Y_(e.type)}}class gv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=pv(e.type)}}class _v{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const ya=/(\w+)(\])?(\[|\.)?/g;function Rh(i,t){i.seq.push(t),i.map[t.id]=t}function vv(i,t,e){const n=i.name,s=n.length;for(ya.lastIndex=0;;){const r=ya.exec(n),o=ya.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Rh(e,c===void 0?new mv(a,i,t):new gv(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new _v(a),Rh(e,u)),e=u}}}class uo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);vv(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Ch(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const xv=37297;let Mv=0;function yv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Ph=new Bt;function Sv(i){Kt._getMatrix(Ph,Kt.workingColorSpace,i);const t=`mat3( ${Ph.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(i)){case _o:return[t,"LinearTransferOETF"];case ne:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ih(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+yv(i.getShaderSource(t),a)}else return r}function bv(i,t){const e=Sv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function wv(i,t){let e;switch(t){case Lu:e="Linear";break;case Du:e="Reinhard";break;case Nu:e="Cineon";break;case Oc:e="ACESFilmic";break;case Fu:e="AgX";break;case Ou:e="Neutral";break;case Uu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Gr=new R;function Tv(){Kt.getLuminanceCoefficients(Gr);const i=Gr.x.toFixed(4),t=Gr.y.toFixed(4),e=Gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ev(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($s).join(`
`)}function Av(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Rv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function $s(i){return i!==""}function Lh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Dh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Cv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ec(i){return i.replace(Cv,Iv)}const Pv=new Map;function Iv(i,t){let e=kt[t];if(e===void 0){const n=Pv.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ec(e)}const Lv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nh(i){return i.replace(Lv,Dv)}function Dv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Uh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Nv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Pu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ao?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Qn&&(t="SHADOWMAP_TYPE_VSM"),t}function Uv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case xs:case Ms:t="ENVMAP_TYPE_CUBE";break;case Ro:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Fv(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Ms&&(t="ENVMAP_MODE_REFRACTION"),t}function Ov(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Iu:t="ENVMAP_BLENDING_MULTIPLY";break;case _f:t="ENVMAP_BLENDING_MIX";break;case vf:t="ENVMAP_BLENDING_ADD";break}return t}function Bv(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function kv(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Nv(e),c=Uv(e),h=Fv(e),u=Ov(e),d=Bv(e),f=Ev(e),m=Av(r),_=s.createProgram();let g,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter($s).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter($s).join(`
`),p.length>0&&(p+=`
`)):(g=[Uh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($s).join(`
`),p=[Uh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Si?"#define TONE_MAPPING":"",e.toneMapping!==Si?kt.tonemapping_pars_fragment:"",e.toneMapping!==Si?wv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,bv("linearToOutputTexel",e.outputColorSpace),Tv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter($s).join(`
`)),o=Ec(o),o=Lh(o,e),o=Dh(o,e),a=Ec(a),a=Lh(a,e),a=Dh(a,e),o=Nh(o),a=Nh(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=v+g+o,x=v+p+a,T=Ch(s,s.VERTEX_SHADER,M),E=Ch(s,s.FRAGMENT_SHADER,x);s.attachShader(_,T),s.attachShader(_,E),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(P){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(_)||"",z=s.getShaderInfoLog(T)||"",V=s.getShaderInfoLog(E)||"",Y=O.trim(),q=z.trim(),j=V.trim();let H=!0,ot=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,T,E);else{const dt=Ih(s,T,"vertex"),wt=Ih(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+Y+`
`+dt+`
`+wt)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(q===""||j==="")&&(ot=!1);ot&&(P.diagnostics={runnable:H,programLog:Y,vertexShader:{log:q,prefix:g},fragmentShader:{log:j,prefix:p}})}s.deleteShader(T),s.deleteShader(E),I=new uo(s,_),S=Rv(s,_)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(_,xv)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Mv++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=E,this}let zv=0;class Hv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Vv(t),e.set(t,n)),n}}class Vv{constructor(t){this.id=zv++,this.code=t,this.usedTimes=0}}function Gv(i,t,e,n,s,r,o){const a=new $c,l=new Hv,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,b,P,O,z){const V=O.fog,Y=z.geometry,q=S.isMeshStandardMaterial?O.environment:null,j=(S.isMeshStandardMaterial?e:t).get(S.envMap||q),H=j&&j.mapping===Ro?j.image.height:null,ot=m[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const dt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,wt=dt!==void 0?dt.length:0;let zt=0;Y.morphAttributes.position!==void 0&&(zt=1),Y.morphAttributes.normal!==void 0&&(zt=2),Y.morphAttributes.color!==void 0&&(zt=3);let ue,oe,X,at;if(ot){const Qt=Bn[ot];ue=Qt.vertexShader,oe=Qt.fragmentShader}else ue=S.vertexShader,oe=S.fragmentShader,l.update(S),X=l.getVertexShaderID(S),at=l.getFragmentShaderID(S);const it=i.getRenderTarget(),Ct=i.state.buffers.depth.getReversed(),Pt=z.isInstancedMesh===!0,Ut=z.isBatchedMesh===!0,ye=!!S.map,Yt=!!S.matcap,L=!!j,ce=!!S.aoMap,Et=!!S.lightMap,Jt=!!S.bumpMap,bt=!!S.normalMap,de=!!S.displacementMap,mt=!!S.emissiveMap,Ht=!!S.metalnessMap,De=!!S.roughnessMap,Se=S.anisotropy>0,A=S.clearcoat>0,y=S.dispersion>0,F=S.iridescence>0,W=S.sheen>0,J=S.transmission>0,G=Se&&!!S.anisotropyMap,St=A&&!!S.clearcoatMap,nt=A&&!!S.clearcoatNormalMap,vt=A&&!!S.clearcoatRoughnessMap,xt=F&&!!S.iridescenceMap,tt=F&&!!S.iridescenceThicknessMap,ht=W&&!!S.sheenColorMap,Lt=W&&!!S.sheenRoughnessMap,Mt=!!S.specularMap,ct=!!S.specularColorMap,Ot=!!S.specularIntensityMap,D=J&&!!S.transmissionMap,et=J&&!!S.thicknessMap,st=!!S.gradientMap,pt=!!S.alphaMap,Z=S.alphaTest>0,K=!!S.alphaHash,_t=!!S.extensions;let Ft=Si;S.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Ft=i.toneMapping);const le={shaderID:ot,shaderType:S.type,shaderName:S.name,vertexShader:ue,fragmentShader:oe,defines:S.defines,customVertexShaderID:X,customFragmentShaderID:at,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ut,batchingColor:Ut&&z._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&z.instanceColor!==null,instancingMorph:Pt&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:it===null?i.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:Qe,alphaToCoverage:!!S.alphaToCoverage,map:ye,matcap:Yt,envMap:L,envMapMode:L&&j.mapping,envMapCubeUVHeight:H,aoMap:ce,lightMap:Et,bumpMap:Jt,normalMap:bt,displacementMap:d&&de,emissiveMap:mt,normalMapObjectSpace:bt&&S.normalMapType===Tf,normalMapTangentSpace:bt&&S.normalMapType===Yu,metalnessMap:Ht,roughnessMap:De,anisotropy:Se,anisotropyMap:G,clearcoat:A,clearcoatMap:St,clearcoatNormalMap:nt,clearcoatRoughnessMap:vt,dispersion:y,iridescence:F,iridescenceMap:xt,iridescenceThicknessMap:tt,sheen:W,sheenColorMap:ht,sheenRoughnessMap:Lt,specularMap:Mt,specularColorMap:ct,specularIntensityMap:Ot,transmission:J,transmissionMap:D,thicknessMap:et,gradientMap:st,opaque:S.transparent===!1&&S.blending===yi&&S.alphaToCoverage===!1,alphaMap:pt,alphaTest:Z,alphaHash:K,combine:S.combine,mapUv:ye&&_(S.map.channel),aoMapUv:ce&&_(S.aoMap.channel),lightMapUv:Et&&_(S.lightMap.channel),bumpMapUv:Jt&&_(S.bumpMap.channel),normalMapUv:bt&&_(S.normalMap.channel),displacementMapUv:de&&_(S.displacementMap.channel),emissiveMapUv:mt&&_(S.emissiveMap.channel),metalnessMapUv:Ht&&_(S.metalnessMap.channel),roughnessMapUv:De&&_(S.roughnessMap.channel),anisotropyMapUv:G&&_(S.anisotropyMap.channel),clearcoatMapUv:St&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:nt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&_(S.sheenRoughnessMap.channel),specularMapUv:Mt&&_(S.specularMap.channel),specularColorMapUv:ct&&_(S.specularColorMap.channel),specularIntensityMapUv:Ot&&_(S.specularIntensityMap.channel),transmissionMapUv:D&&_(S.transmissionMap.channel),thicknessMapUv:et&&_(S.thicknessMap.channel),alphaMapUv:pt&&_(S.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(bt||Se),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Y.attributes.uv&&(ye||pt),fog:!!V,useFog:S.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ct,skinning:z.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:zt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ft,decodeVideoTexture:ye&&S.map.isVideoTexture===!0&&Kt.getTransfer(S.map.colorSpace)===ne,decodeVideoTextureEmissive:mt&&S.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(S.emissiveMap.colorSpace)===ne,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===fe,flipSided:S.side===je,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:_t&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_t&&S.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return le.vertexUv1s=c.has(1),le.vertexUv2s=c.has(2),le.vertexUv3s=c.has(3),c.clear(),le}function p(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)b.push(P),b.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(v(b,S),M(b,S),b.push(i.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function v(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function M(S,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),S.push(a.mask)}function x(S){const b=m[S.type];let P;if(b){const O=Bn[b];P=bs.clone(O.uniforms)}else P=S.uniforms;return P}function T(S,b){let P;for(let O=0,z=h.length;O<z;O++){const V=h[O];if(V.cacheKey===b){P=V,++P.usedTimes;break}}return P===void 0&&(P=new kv(i,b,S,r),h.push(P)),P}function E(S){if(--S.usedTimes===0){const b=h.indexOf(S);h[b]=h[h.length-1],h.pop(),S.destroy()}}function C(S){l.remove(S)}function I(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:T,releaseProgram:E,releaseShaderCache:C,programs:h,dispose:I}}function Wv(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Xv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Fh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Oh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,m,_,g){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:_,group:g},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=_,p.group=g),t++,p}function a(u,d,f,m,_,g){const p=o(u,d,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(u,d,f,m,_,g){const p=o(u,d,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||Xv),n.length>1&&n.sort(d||Fh),s.length>1&&s.sort(d||Fh)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function qv(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Oh,i.set(n,[o])):s>=r.length?(o=new Oh,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Kv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new yt};break;case"SpotLight":e={position:new R,direction:new R,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":e={color:new yt,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function Yv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let jv=0;function $v(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Jv(i){const t=new Kv,e=Yv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const s=new R,r=new Rt,o=new Rt;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,v=0,M=0,x=0,T=0,E=0,C=0;c.sort($v);for(let S=0,b=c.length;S<b;S++){const P=c[S],O=P.color,z=P.intensity,V=P.distance,Y=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=O.r*z,u+=O.g*z,d+=O.b*z;else if(P.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(P.sh.coefficients[q],z);C++}else if(P.isDirectionalLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const j=P.shadow,H=e.get(P);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=P.shadow.matrix,v++}n.directional[f]=q,f++}else if(P.isSpotLight){const q=t.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(O).multiplyScalar(z),q.distance=V,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,n.spot[_]=q;const j=P.shadow;if(P.map&&(n.spotLightMap[T]=P.map,T++,j.updateMatrices(P),P.castShadow&&E++),n.spotLightMatrix[_]=j.matrix,P.castShadow){const H=e.get(P);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=Y,x++}_++}else if(P.isRectAreaLight){const q=t.get(P);q.color.copy(O).multiplyScalar(z),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=q,g++}else if(P.isPointLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){const j=P.shadow,H=e.get(P);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,H.shadowCameraNear=j.camera.near,H.shadowCameraFar=j.camera.far,n.pointShadow[m]=H,n.pointShadowMap[m]=Y,n.pointShadowMatrix[m]=P.shadow.matrix,M++}n.point[m]=q,m++}else if(P.isHemisphereLight){const q=t.get(P);q.skyColor.copy(P.color).multiplyScalar(z),q.groundColor.copy(P.groundColor).multiplyScalar(z),n.hemi[p]=q,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=rt.LTC_FLOAT_1,n.rectAreaLTC2=rt.LTC_FLOAT_2):(n.rectAreaLTC1=rt.LTC_HALF_1,n.rectAreaLTC2=rt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==f||I.pointLength!==m||I.spotLength!==_||I.rectAreaLength!==g||I.hemiLength!==p||I.numDirectionalShadows!==v||I.numPointShadows!==M||I.numSpotShadows!==x||I.numSpotMaps!==T||I.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+T-E,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,I.directionalLength=f,I.pointLength=m,I.spotLength=_,I.rectAreaLength=g,I.hemiLength=p,I.numDirectionalShadows=v,I.numPointShadows=M,I.numSpotShadows=x,I.numSpotMaps=T,I.numLightProbes=C,n.version=jv++)}function l(c,h){let u=0,d=0,f=0,m=0,_=0;const g=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const M=c[p];if(M.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),u++}else if(M.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),f++}else if(M.isRectAreaLight){const x=n.rectArea[m];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(g),o.identity(),r.copy(M.matrixWorld),r.premultiply(g),o.extractRotation(r),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),m++}else if(M.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(g),d++}else if(M.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:n}}function Bh(i){const t=new Jv(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Zv(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Bh(i),t.set(s,[a])):r>=o.length?(a=new Bh(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Qv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function ex(i,t,e){let n=new ur;const s=new ut,r=new ut,o=new Zt,a=new $p({depthPacking:wf}),l=new Jp,c={},h=e.maxTextureSize,u={[oi]:je,[je]:oi,[fe]:fe},d=new Oe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:Qv,fragmentShader:tx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new be;m.setAttribute("position",new Je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new $(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pu;let p=this.type;this.render=function(E,C,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;const S=i.getRenderTarget(),b=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),O=i.state;O.setBlending(ii),O.buffers.depth.getReversed()?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const z=p!==Qn&&this.type===Qn,V=p===Qn&&this.type!==Qn;for(let Y=0,q=E.length;Y<q;Y++){const j=E[Y],H=j.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const ot=H.getFrameExtents();if(s.multiply(ot),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ot.x),s.x=r.x*ot.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ot.y),s.y=r.y*ot.y,H.mapSize.y=r.y)),H.map===null||z===!0||V===!0){const wt=this.type!==Qn?{minFilter:$e,magFilter:$e}:{};H.map!==null&&H.map.dispose(),H.map=new Dn(s.x,s.y,wt),H.map.texture.name=j.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const dt=H.getViewportCount();for(let wt=0;wt<dt;wt++){const zt=H.getViewport(wt);o.set(r.x*zt.x,r.y*zt.y,r.x*zt.z,r.y*zt.w),O.viewport(o),H.updateMatrices(j,wt),n=H.getFrustum(),x(C,I,H.camera,j,this.type)}H.isPointLightShadow!==!0&&this.type===Qn&&v(H,I),H.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(S,b,P)};function v(E,C){const I=t.update(_);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Dn(s.x,s.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,I,d,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,I,f,_,null)}function M(E,C,I,S){let b=null;const P=I.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(P!==void 0)b=P;else if(b=I.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const O=b.uuid,z=C.uuid;let V=c[O];V===void 0&&(V={},c[O]=V);let Y=V[z];Y===void 0&&(Y=b.clone(),V[z]=Y,C.addEventListener("dispose",T)),b=Y}if(b.visible=C.visible,b.wireframe=C.wireframe,S===Qn?b.side=C.shadowSide!==null?C.shadowSide:C.side:b.side=C.shadowSide!==null?C.shadowSide:u[C.side],b.alphaMap=C.alphaMap,b.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,b.map=C.map,b.clipShadows=C.clipShadows,b.clippingPlanes=C.clippingPlanes,b.clipIntersection=C.clipIntersection,b.displacementMap=C.displacementMap,b.displacementScale=C.displacementScale,b.displacementBias=C.displacementBias,b.wireframeLinewidth=C.wireframeLinewidth,b.linewidth=C.linewidth,I.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const O=i.properties.get(b);O.light=I}return b}function x(E,C,I,S,b){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&b===Qn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,E.matrixWorld);const z=t.update(E),V=E.material;if(Array.isArray(V)){const Y=z.groups;for(let q=0,j=Y.length;q<j;q++){const H=Y[q],ot=V[H.materialIndex];if(ot&&ot.visible){const dt=M(E,ot,S,b);E.onBeforeShadow(i,E,C,I,z,dt,H),i.renderBufferDirect(I,null,z,dt,E,H),E.onAfterShadow(i,E,C,I,z,dt,H)}}}else if(V.visible){const Y=M(E,V,S,b);E.onBeforeShadow(i,E,C,I,z,Y,null),i.renderBufferDirect(I,null,z,Y,E,null),E.onAfterShadow(i,E,C,I,z,Y,null)}}const O=E.children;for(let z=0,V=O.length;z<V;z++)x(O[z],C,I,S,b)}function T(E){E.target.removeEventListener("dispose",T);for(const I in c){const S=c[I],b=E.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}const nx={[ka]:za,[Ha]:Wa,[Va]:Xa,[vs]:Ga,[za]:ka,[Wa]:Ha,[Xa]:Va,[Ga]:vs};function ix(i,t){function e(){let D=!1;const et=new Zt;let st=null;const pt=new Zt(0,0,0,0);return{setMask:function(Z){st!==Z&&!D&&(i.colorMask(Z,Z,Z,Z),st=Z)},setLocked:function(Z){D=Z},setClear:function(Z,K,_t,Ft,le){le===!0&&(Z*=Ft,K*=Ft,_t*=Ft),et.set(Z,K,_t,Ft),pt.equals(et)===!1&&(i.clearColor(Z,K,_t,Ft),pt.copy(et))},reset:function(){D=!1,st=null,pt.set(-1,0,0,0)}}}function n(){let D=!1,et=!1,st=null,pt=null,Z=null;return{setReversed:function(K){if(et!==K){const _t=t.get("EXT_clip_control");K?_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.ZERO_TO_ONE_EXT):_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.NEGATIVE_ONE_TO_ONE_EXT),et=K;const Ft=Z;Z=null,this.setClear(Ft)}},getReversed:function(){return et},setTest:function(K){K?it(i.DEPTH_TEST):Ct(i.DEPTH_TEST)},setMask:function(K){st!==K&&!D&&(i.depthMask(K),st=K)},setFunc:function(K){if(et&&(K=nx[K]),pt!==K){switch(K){case ka:i.depthFunc(i.NEVER);break;case za:i.depthFunc(i.ALWAYS);break;case Ha:i.depthFunc(i.LESS);break;case vs:i.depthFunc(i.LEQUAL);break;case Va:i.depthFunc(i.EQUAL);break;case Ga:i.depthFunc(i.GEQUAL);break;case Wa:i.depthFunc(i.GREATER);break;case Xa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pt=K}},setLocked:function(K){D=K},setClear:function(K){Z!==K&&(et&&(K=1-K),i.clearDepth(K),Z=K)},reset:function(){D=!1,st=null,pt=null,Z=null,et=!1}}}function s(){let D=!1,et=null,st=null,pt=null,Z=null,K=null,_t=null,Ft=null,le=null;return{setTest:function(Qt){D||(Qt?it(i.STENCIL_TEST):Ct(i.STENCIL_TEST))},setMask:function(Qt){et!==Qt&&!D&&(i.stencilMask(Qt),et=Qt)},setFunc:function(Qt,Xn,Fn){(st!==Qt||pt!==Xn||Z!==Fn)&&(i.stencilFunc(Qt,Xn,Fn),st=Qt,pt=Xn,Z=Fn)},setOp:function(Qt,Xn,Fn){(K!==Qt||_t!==Xn||Ft!==Fn)&&(i.stencilOp(Qt,Xn,Fn),K=Qt,_t=Xn,Ft=Fn)},setLocked:function(Qt){D=Qt},setClear:function(Qt){le!==Qt&&(i.clearStencil(Qt),le=Qt)},reset:function(){D=!1,et=null,st=null,pt=null,Z=null,K=null,_t=null,Ft=null,le=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,v=null,M=null,x=null,T=null,E=null,C=new yt(0,0,0),I=0,S=!1,b=null,P=null,O=null,z=null,V=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,j=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(H)[1]),q=j>=1):H.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),q=j>=2);let ot=null,dt={};const wt=i.getParameter(i.SCISSOR_BOX),zt=i.getParameter(i.VIEWPORT),ue=new Zt().fromArray(wt),oe=new Zt().fromArray(zt);function X(D,et,st,pt){const Z=new Uint8Array(4),K=i.createTexture();i.bindTexture(D,K),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _t=0;_t<st;_t++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(et,0,i.RGBA,1,1,pt,0,i.RGBA,i.UNSIGNED_BYTE,Z):i.texImage2D(et+_t,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Z);return K}const at={};at[i.TEXTURE_2D]=X(i.TEXTURE_2D,i.TEXTURE_2D,1),at[i.TEXTURE_CUBE_MAP]=X(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[i.TEXTURE_2D_ARRAY]=X(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),at[i.TEXTURE_3D]=X(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),it(i.DEPTH_TEST),o.setFunc(vs),Jt(!1),bt(bl),it(i.CULL_FACE),ce(ii);function it(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function Ct(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Pt(D,et){return u[D]!==et?(i.bindFramebuffer(D,et),u[D]=et,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=et),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=et),!0):!1}function Ut(D,et){let st=f,pt=!1;if(D){st=d.get(et),st===void 0&&(st=[],d.set(et,st));const Z=D.textures;if(st.length!==Z.length||st[0]!==i.COLOR_ATTACHMENT0){for(let K=0,_t=Z.length;K<_t;K++)st[K]=i.COLOR_ATTACHMENT0+K;st.length=Z.length,pt=!0}}else st[0]!==i.BACK&&(st[0]=i.BACK,pt=!0);pt&&i.drawBuffers(st)}function ye(D){return m!==D?(i.useProgram(D),m=D,!0):!1}const Yt={[Oi]:i.FUNC_ADD,[Qd]:i.FUNC_SUBTRACT,[tf]:i.FUNC_REVERSE_SUBTRACT};Yt[ef]=i.MIN,Yt[nf]=i.MAX;const L={[sf]:i.ZERO,[rf]:i.ONE,[of]:i.SRC_COLOR,[Oa]:i.SRC_ALPHA,[df]:i.SRC_ALPHA_SATURATE,[hf]:i.DST_COLOR,[cf]:i.DST_ALPHA,[af]:i.ONE_MINUS_SRC_COLOR,[Ba]:i.ONE_MINUS_SRC_ALPHA,[uf]:i.ONE_MINUS_DST_COLOR,[lf]:i.ONE_MINUS_DST_ALPHA,[ff]:i.CONSTANT_COLOR,[pf]:i.ONE_MINUS_CONSTANT_COLOR,[mf]:i.CONSTANT_ALPHA,[gf]:i.ONE_MINUS_CONSTANT_ALPHA};function ce(D,et,st,pt,Z,K,_t,Ft,le,Qt){if(D===ii){_===!0&&(Ct(i.BLEND),_=!1);return}if(_===!1&&(it(i.BLEND),_=!0),D!==Zd){if(D!==g||Qt!==S){if((p!==Oi||x!==Oi)&&(i.blendEquation(i.FUNC_ADD),p=Oi,x=Oi),Qt)switch(D){case yi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case se:i.blendFunc(i.ONE,i.ONE);break;case wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Tl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case yi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case se:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case wl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Tl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}v=null,M=null,T=null,E=null,C.set(0,0,0),I=0,g=D,S=Qt}return}Z=Z||et,K=K||st,_t=_t||pt,(et!==p||Z!==x)&&(i.blendEquationSeparate(Yt[et],Yt[Z]),p=et,x=Z),(st!==v||pt!==M||K!==T||_t!==E)&&(i.blendFuncSeparate(L[st],L[pt],L[K],L[_t]),v=st,M=pt,T=K,E=_t),(Ft.equals(C)===!1||le!==I)&&(i.blendColor(Ft.r,Ft.g,Ft.b,le),C.copy(Ft),I=le),g=D,S=!1}function Et(D,et){D.side===fe?Ct(i.CULL_FACE):it(i.CULL_FACE);let st=D.side===je;et&&(st=!st),Jt(st),D.blending===yi&&D.transparent===!1?ce(ii):ce(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);const pt=D.stencilWrite;a.setTest(pt),pt&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),mt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?it(i.SAMPLE_ALPHA_TO_COVERAGE):Ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function Jt(D){b!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),b=D)}function bt(D){D!==$d?(it(i.CULL_FACE),D!==P&&(D===bl?i.cullFace(i.BACK):D===Jd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ct(i.CULL_FACE),P=D}function de(D){D!==O&&(q&&i.lineWidth(D),O=D)}function mt(D,et,st){D?(it(i.POLYGON_OFFSET_FILL),(z!==et||V!==st)&&(i.polygonOffset(et,st),z=et,V=st)):Ct(i.POLYGON_OFFSET_FILL)}function Ht(D){D?it(i.SCISSOR_TEST):Ct(i.SCISSOR_TEST)}function De(D){D===void 0&&(D=i.TEXTURE0+Y-1),ot!==D&&(i.activeTexture(D),ot=D)}function Se(D,et,st){st===void 0&&(ot===null?st=i.TEXTURE0+Y-1:st=ot);let pt=dt[st];pt===void 0&&(pt={type:void 0,texture:void 0},dt[st]=pt),(pt.type!==D||pt.texture!==et)&&(ot!==st&&(i.activeTexture(st),ot=st),i.bindTexture(D,et||at[D]),pt.type=D,pt.texture=et)}function A(){const D=dt[ot];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function y(){try{i.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function W(){try{i.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(){try{i.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function St(){try{i.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function nt(){try{i.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function vt(){try{i.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xt(){try{i.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function tt(){try{i.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ht(D){ue.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),ue.copy(D))}function Lt(D){oe.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),oe.copy(D))}function Mt(D,et){let st=c.get(et);st===void 0&&(st=new WeakMap,c.set(et,st));let pt=st.get(D);pt===void 0&&(pt=i.getUniformBlockIndex(et,D.name),st.set(D,pt))}function ct(D,et){const pt=c.get(et).get(D);l.get(et)!==pt&&(i.uniformBlockBinding(et,pt,D.__bindingPointIndex),l.set(et,pt))}function Ot(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ot=null,dt={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,v=null,M=null,x=null,T=null,E=null,C=new yt(0,0,0),I=0,S=!1,b=null,P=null,O=null,z=null,V=null,ue.set(0,0,i.canvas.width,i.canvas.height),oe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:it,disable:Ct,bindFramebuffer:Pt,drawBuffers:Ut,useProgram:ye,setBlending:ce,setMaterial:Et,setFlipSided:Jt,setCullFace:bt,setLineWidth:de,setPolygonOffset:mt,setScissorTest:Ht,activeTexture:De,bindTexture:Se,unbindTexture:A,compressedTexImage2D:y,compressedTexImage3D:F,texImage2D:xt,texImage3D:tt,updateUBOMapping:Mt,uniformBlockBinding:ct,texStorage2D:nt,texStorage3D:vt,texSubImage2D:W,texSubImage3D:J,compressedTexSubImage2D:G,compressedTexSubImage3D:St,scissor:ht,viewport:Lt,reset:Ot}}function sx(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ut,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,y){return f?new OffscreenCanvas(A,y):lr("canvas")}function _(A,y,F){let W=1;const J=Se(A);if((J.width>F||J.height>F)&&(W=F/Math.max(J.width,J.height)),W<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const G=Math.floor(W*J.width),St=Math.floor(W*J.height);u===void 0&&(u=m(G,St));const nt=y?m(G,St):u;return nt.width=G,nt.height=St,nt.getContext("2d").drawImage(A,0,0,G,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+G+"x"+St+")."),nt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),A;return A}function g(A){return A.generateMipmaps}function p(A){i.generateMipmap(A)}function v(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(A,y,F,W,J=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let G=y;if(y===i.RED&&(F===i.FLOAT&&(G=i.R32F),F===i.HALF_FLOAT&&(G=i.R16F),F===i.UNSIGNED_BYTE&&(G=i.R8)),y===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.R8UI),F===i.UNSIGNED_SHORT&&(G=i.R16UI),F===i.UNSIGNED_INT&&(G=i.R32UI),F===i.BYTE&&(G=i.R8I),F===i.SHORT&&(G=i.R16I),F===i.INT&&(G=i.R32I)),y===i.RG&&(F===i.FLOAT&&(G=i.RG32F),F===i.HALF_FLOAT&&(G=i.RG16F),F===i.UNSIGNED_BYTE&&(G=i.RG8)),y===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.RG8UI),F===i.UNSIGNED_SHORT&&(G=i.RG16UI),F===i.UNSIGNED_INT&&(G=i.RG32UI),F===i.BYTE&&(G=i.RG8I),F===i.SHORT&&(G=i.RG16I),F===i.INT&&(G=i.RG32I)),y===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.RGB8UI),F===i.UNSIGNED_SHORT&&(G=i.RGB16UI),F===i.UNSIGNED_INT&&(G=i.RGB32UI),F===i.BYTE&&(G=i.RGB8I),F===i.SHORT&&(G=i.RGB16I),F===i.INT&&(G=i.RGB32I)),y===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(G=i.RGBA16UI),F===i.UNSIGNED_INT&&(G=i.RGBA32UI),F===i.BYTE&&(G=i.RGBA8I),F===i.SHORT&&(G=i.RGBA16I),F===i.INT&&(G=i.RGBA32I)),y===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(G=i.RGB9_E5),y===i.RGBA){const St=J?_o:Kt.getTransfer(W);F===i.FLOAT&&(G=i.RGBA32F),F===i.HALF_FLOAT&&(G=i.RGBA16F),F===i.UNSIGNED_BYTE&&(G=St===ne?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(G=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(G=i.RGB5_A1)}return(G===i.R16F||G===i.R32F||G===i.RG16F||G===i.RG32F||G===i.RGBA16F||G===i.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function x(A,y){let F;return A?y===null||y===Vi||y===sr?F=i.DEPTH24_STENCIL8:y===Pn?F=i.DEPTH32F_STENCIL8:y===ir&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Vi||y===sr?F=i.DEPTH_COMPONENT24:y===Pn?F=i.DEPTH_COMPONENT32F:y===ir&&(F=i.DEPTH_COMPONENT16),F}function T(A,y){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==$e&&A.minFilter!==rn?Math.log2(Math.max(y.width,y.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?y.mipmaps.length:1}function E(A){const y=A.target;y.removeEventListener("dispose",E),I(y),y.isVideoTexture&&h.delete(y)}function C(A){const y=A.target;y.removeEventListener("dispose",C),b(y)}function I(A){const y=n.get(A);if(y.__webglInit===void 0)return;const F=A.source,W=d.get(F);if(W){const J=W[y.__cacheKey];J.usedTimes--,J.usedTimes===0&&S(A),Object.keys(W).length===0&&d.delete(F)}n.remove(A)}function S(A){const y=n.get(A);i.deleteTexture(y.__webglTexture);const F=A.source,W=d.get(F);delete W[y.__cacheKey],o.memory.textures--}function b(A){const y=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(y.__webglFramebuffer[W]))for(let J=0;J<y.__webglFramebuffer[W].length;J++)i.deleteFramebuffer(y.__webglFramebuffer[W][J]);else i.deleteFramebuffer(y.__webglFramebuffer[W]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[W])}else{if(Array.isArray(y.__webglFramebuffer))for(let W=0;W<y.__webglFramebuffer.length;W++)i.deleteFramebuffer(y.__webglFramebuffer[W]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let W=0;W<y.__webglColorRenderbuffer.length;W++)y.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[W]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const F=A.textures;for(let W=0,J=F.length;W<J;W++){const G=n.get(F[W]);G.__webglTexture&&(i.deleteTexture(G.__webglTexture),o.memory.textures--),n.remove(F[W])}n.remove(A)}let P=0;function O(){P=0}function z(){const A=P;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),P+=1,A}function V(A){const y=[];return y.push(A.wrapS),y.push(A.wrapT),y.push(A.wrapR||0),y.push(A.magFilter),y.push(A.minFilter),y.push(A.anisotropy),y.push(A.internalFormat),y.push(A.format),y.push(A.type),y.push(A.generateMipmaps),y.push(A.premultiplyAlpha),y.push(A.flipY),y.push(A.unpackAlignment),y.push(A.colorSpace),y.join()}function Y(A,y){const F=n.get(A);if(A.isVideoTexture&&Ht(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&F.__version!==A.version){const W=A.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{at(F,A,y);return}}else A.isExternalTexture&&(F.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+y)}function q(A,y){const F=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){at(F,A,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+y)}function j(A,y){const F=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){at(F,A,y);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+y)}function H(A,y){const F=n.get(A);if(A.version>0&&F.__version!==A.version){it(F,A,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+y)}const ot={[Hi]:i.REPEAT,[Mi]:i.CLAMP_TO_EDGE,[mo]:i.MIRRORED_REPEAT},dt={[$e]:i.NEAREST,[ku]:i.NEAREST_MIPMAP_NEAREST,[js]:i.NEAREST_MIPMAP_LINEAR,[rn]:i.LINEAR,[so]:i.LINEAR_MIPMAP_NEAREST,[kn]:i.LINEAR_MIPMAP_LINEAR},wt={[Ef]:i.NEVER,[Lf]:i.ALWAYS,[Af]:i.LESS,[ju]:i.LEQUAL,[Rf]:i.EQUAL,[If]:i.GEQUAL,[Cf]:i.GREATER,[Pf]:i.NOTEQUAL};function zt(A,y){if(y.type===Pn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===rn||y.magFilter===so||y.magFilter===js||y.magFilter===kn||y.minFilter===rn||y.minFilter===so||y.minFilter===js||y.minFilter===kn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,ot[y.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,ot[y.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,ot[y.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,dt[y.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,dt[y.minFilter]),y.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,wt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===$e||y.minFilter!==js&&y.minFilter!==kn||y.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function ue(A,y){let F=!1;A.__webglInit===void 0&&(A.__webglInit=!0,y.addEventListener("dispose",E));const W=y.source;let J=d.get(W);J===void 0&&(J={},d.set(W,J));const G=V(y);if(G!==A.__cacheKey){J[G]===void 0&&(J[G]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),J[G].usedTimes++;const St=J[A.__cacheKey];St!==void 0&&(J[A.__cacheKey].usedTimes--,St.usedTimes===0&&S(y)),A.__cacheKey=G,A.__webglTexture=J[G].texture}return F}function oe(A,y,F){return Math.floor(Math.floor(A/F)/y)}function X(A,y,F,W){const G=A.updateRanges;if(G.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,F,W,y.data);else{G.sort((tt,ht)=>tt.start-ht.start);let St=0;for(let tt=1;tt<G.length;tt++){const ht=G[St],Lt=G[tt],Mt=ht.start+ht.count,ct=oe(Lt.start,y.width,4),Ot=oe(ht.start,y.width,4);Lt.start<=Mt+1&&ct===Ot&&oe(Lt.start+Lt.count-1,y.width,4)===ct?ht.count=Math.max(ht.count,Lt.start+Lt.count-ht.start):(++St,G[St]=Lt)}G.length=St+1;const nt=i.getParameter(i.UNPACK_ROW_LENGTH),vt=i.getParameter(i.UNPACK_SKIP_PIXELS),xt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let tt=0,ht=G.length;tt<ht;tt++){const Lt=G[tt],Mt=Math.floor(Lt.start/4),ct=Math.ceil(Lt.count/4),Ot=Mt%y.width,D=Math.floor(Mt/y.width),et=ct,st=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ot),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),e.texSubImage2D(i.TEXTURE_2D,0,Ot,D,et,st,F,W,y.data)}A.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,nt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,vt),i.pixelStorei(i.UNPACK_SKIP_ROWS,xt)}}function at(A,y,F){let W=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(W=i.TEXTURE_3D);const J=ue(A,y),G=y.source;e.bindTexture(W,A.__webglTexture,i.TEXTURE0+F);const St=n.get(G);if(G.version!==St.__version||J===!0){e.activeTexture(i.TEXTURE0+F);const nt=Kt.getPrimaries(Kt.workingColorSpace),vt=y.colorSpace===ei?null:Kt.getPrimaries(y.colorSpace),xt=y.colorSpace===ei||nt===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let tt=_(y.image,!1,s.maxTextureSize);tt=De(y,tt);const ht=r.convert(y.format,y.colorSpace),Lt=r.convert(y.type);let Mt=M(y.internalFormat,ht,Lt,y.colorSpace,y.isVideoTexture);zt(W,y);let ct;const Ot=y.mipmaps,D=y.isVideoTexture!==!0,et=St.__version===void 0||J===!0,st=G.dataReady,pt=T(y,tt);if(y.isDepthTexture)Mt=x(y.format===or,y.type),et&&(D?e.texStorage2D(i.TEXTURE_2D,1,Mt,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,Mt,tt.width,tt.height,0,ht,Lt,null));else if(y.isDataTexture)if(Ot.length>0){D&&et&&e.texStorage2D(i.TEXTURE_2D,pt,Mt,Ot[0].width,Ot[0].height);for(let Z=0,K=Ot.length;Z<K;Z++)ct=Ot[Z],D?st&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,ct.width,ct.height,ht,Lt,ct.data):e.texImage2D(i.TEXTURE_2D,Z,Mt,ct.width,ct.height,0,ht,Lt,ct.data);y.generateMipmaps=!1}else D?(et&&e.texStorage2D(i.TEXTURE_2D,pt,Mt,tt.width,tt.height),st&&X(y,tt,ht,Lt)):e.texImage2D(i.TEXTURE_2D,0,Mt,tt.width,tt.height,0,ht,Lt,tt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){D&&et&&e.texStorage3D(i.TEXTURE_2D_ARRAY,pt,Mt,Ot[0].width,Ot[0].height,tt.depth);for(let Z=0,K=Ot.length;Z<K;Z++)if(ct=Ot[Z],y.format!==vn)if(ht!==null)if(D){if(st)if(y.layerUpdates.size>0){const _t=ph(ct.width,ct.height,y.format,y.type);for(const Ft of y.layerUpdates){const le=ct.data.subarray(Ft*_t/ct.data.BYTES_PER_ELEMENT,(Ft+1)*_t/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,Ft,ct.width,ct.height,1,ht,le)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,ct.width,ct.height,tt.depth,ht,ct.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Z,Mt,ct.width,ct.height,tt.depth,0,ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?st&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,ct.width,ct.height,tt.depth,ht,Lt,ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Z,Mt,ct.width,ct.height,tt.depth,0,ht,Lt,ct.data)}else{D&&et&&e.texStorage2D(i.TEXTURE_2D,pt,Mt,Ot[0].width,Ot[0].height);for(let Z=0,K=Ot.length;Z<K;Z++)ct=Ot[Z],y.format!==vn?ht!==null?D?st&&e.compressedTexSubImage2D(i.TEXTURE_2D,Z,0,0,ct.width,ct.height,ht,ct.data):e.compressedTexImage2D(i.TEXTURE_2D,Z,Mt,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?st&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,ct.width,ct.height,ht,Lt,ct.data):e.texImage2D(i.TEXTURE_2D,Z,Mt,ct.width,ct.height,0,ht,Lt,ct.data)}else if(y.isDataArrayTexture)if(D){if(et&&e.texStorage3D(i.TEXTURE_2D_ARRAY,pt,Mt,tt.width,tt.height,tt.depth),st)if(y.layerUpdates.size>0){const Z=ph(tt.width,tt.height,y.format,y.type);for(const K of y.layerUpdates){const _t=tt.data.subarray(K*Z/tt.data.BYTES_PER_ELEMENT,(K+1)*Z/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,tt.width,tt.height,1,ht,Lt,_t)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ht,Lt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Mt,tt.width,tt.height,tt.depth,0,ht,Lt,tt.data);else if(y.isData3DTexture)D?(et&&e.texStorage3D(i.TEXTURE_3D,pt,Mt,tt.width,tt.height,tt.depth),st&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ht,Lt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,Mt,tt.width,tt.height,tt.depth,0,ht,Lt,tt.data);else if(y.isFramebufferTexture){if(et)if(D)e.texStorage2D(i.TEXTURE_2D,pt,Mt,tt.width,tt.height);else{let Z=tt.width,K=tt.height;for(let _t=0;_t<pt;_t++)e.texImage2D(i.TEXTURE_2D,_t,Mt,Z,K,0,ht,Lt,null),Z>>=1,K>>=1}}else if(Ot.length>0){if(D&&et){const Z=Se(Ot[0]);e.texStorage2D(i.TEXTURE_2D,pt,Mt,Z.width,Z.height)}for(let Z=0,K=Ot.length;Z<K;Z++)ct=Ot[Z],D?st&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,ht,Lt,ct):e.texImage2D(i.TEXTURE_2D,Z,Mt,ht,Lt,ct);y.generateMipmaps=!1}else if(D){if(et){const Z=Se(tt);e.texStorage2D(i.TEXTURE_2D,pt,Mt,Z.width,Z.height)}st&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ht,Lt,tt)}else e.texImage2D(i.TEXTURE_2D,0,Mt,ht,Lt,tt);g(y)&&p(W),St.__version=G.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function it(A,y,F){if(y.image.length!==6)return;const W=ue(A,y),J=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+F);const G=n.get(J);if(J.version!==G.__version||W===!0){e.activeTexture(i.TEXTURE0+F);const St=Kt.getPrimaries(Kt.workingColorSpace),nt=y.colorSpace===ei?null:Kt.getPrimaries(y.colorSpace),vt=y.colorSpace===ei||St===nt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const xt=y.isCompressedTexture||y.image[0].isCompressedTexture,tt=y.image[0]&&y.image[0].isDataTexture,ht=[];for(let K=0;K<6;K++)!xt&&!tt?ht[K]=_(y.image[K],!0,s.maxCubemapSize):ht[K]=tt?y.image[K].image:y.image[K],ht[K]=De(y,ht[K]);const Lt=ht[0],Mt=r.convert(y.format,y.colorSpace),ct=r.convert(y.type),Ot=M(y.internalFormat,Mt,ct,y.colorSpace),D=y.isVideoTexture!==!0,et=G.__version===void 0||W===!0,st=J.dataReady;let pt=T(y,Lt);zt(i.TEXTURE_CUBE_MAP,y);let Z;if(xt){D&&et&&e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Ot,Lt.width,Lt.height);for(let K=0;K<6;K++){Z=ht[K].mipmaps;for(let _t=0;_t<Z.length;_t++){const Ft=Z[_t];y.format!==vn?Mt!==null?D?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,0,0,Ft.width,Ft.height,Mt,Ft.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,Ot,Ft.width,Ft.height,0,Ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,0,0,Ft.width,Ft.height,Mt,ct,Ft.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,Ot,Ft.width,Ft.height,0,Mt,ct,Ft.data)}}}else{if(Z=y.mipmaps,D&&et){Z.length>0&&pt++;const K=Se(ht[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Ot,K.width,K.height)}for(let K=0;K<6;K++)if(tt){D?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ht[K].width,ht[K].height,Mt,ct,ht[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ot,ht[K].width,ht[K].height,0,Mt,ct,ht[K].data);for(let _t=0;_t<Z.length;_t++){const le=Z[_t].image[K].image;D?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,0,0,le.width,le.height,Mt,ct,le.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,Ot,le.width,le.height,0,Mt,ct,le.data)}}else{D?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Mt,ct,ht[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ot,Mt,ct,ht[K]);for(let _t=0;_t<Z.length;_t++){const Ft=Z[_t];D?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,0,0,Mt,ct,Ft.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,Ot,Mt,ct,Ft.image[K])}}}g(y)&&p(i.TEXTURE_CUBE_MAP),G.__version=J.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function Ct(A,y,F,W,J,G){const St=r.convert(F.format,F.colorSpace),nt=r.convert(F.type),vt=M(F.internalFormat,St,nt,F.colorSpace),xt=n.get(y),tt=n.get(F);if(tt.__renderTarget=y,!xt.__hasExternalTextures){const ht=Math.max(1,y.width>>G),Lt=Math.max(1,y.height>>G);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,G,vt,ht,Lt,y.depth,0,St,nt,null):e.texImage2D(J,G,vt,ht,Lt,0,St,nt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),mt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,J,tt.__webglTexture,0,de(y)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,J,tt.__webglTexture,G),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Pt(A,y,F){if(i.bindRenderbuffer(i.RENDERBUFFER,A),y.depthBuffer){const W=y.depthTexture,J=W&&W.isDepthTexture?W.type:null,G=x(y.stencilBuffer,J),St=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=de(y);mt(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,nt,G,y.width,y.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,nt,G,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,G,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,St,i.RENDERBUFFER,A)}else{const W=y.textures;for(let J=0;J<W.length;J++){const G=W[J],St=r.convert(G.format,G.colorSpace),nt=r.convert(G.type),vt=M(G.internalFormat,St,nt,G.colorSpace),xt=de(y);F&&mt(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt,vt,y.width,y.height):mt(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt,vt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,vt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ut(A,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const W=n.get(y.depthTexture);W.__renderTarget=y,(!W.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Y(y.depthTexture,0);const J=W.__webglTexture,G=de(y);if(y.depthTexture.format===rr)mt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(y.depthTexture.format===or)mt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function ye(A){const y=n.get(A),F=A.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==A.depthTexture){const W=A.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),W){const J=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,W.removeEventListener("dispose",J)};W.addEventListener("dispose",J),y.__depthDisposeCallback=J}y.__boundDepthTexture=W}if(A.depthTexture&&!y.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const W=A.texture.mipmaps;W&&W.length>0?Ut(y.__webglFramebuffer[0],A):Ut(y.__webglFramebuffer,A)}else if(F){y.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[W]),y.__webglDepthbuffer[W]===void 0)y.__webglDepthbuffer[W]=i.createRenderbuffer(),Pt(y.__webglDepthbuffer[W],A,!1);else{const J=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=y.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,G)}}else{const W=A.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Pt(y.__webglDepthbuffer,A,!1);else{const J=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,G)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Yt(A,y,F){const W=n.get(A);y!==void 0&&Ct(W.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&ye(A)}function L(A){const y=A.texture,F=n.get(A),W=n.get(y);A.addEventListener("dispose",C);const J=A.textures,G=A.isWebGLCubeRenderTarget===!0,St=J.length>1;if(St||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=y.version,o.memory.textures++),G){F.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer[nt]=[];for(let vt=0;vt<y.mipmaps.length;vt++)F.__webglFramebuffer[nt][vt]=i.createFramebuffer()}else F.__webglFramebuffer[nt]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer=[];for(let nt=0;nt<y.mipmaps.length;nt++)F.__webglFramebuffer[nt]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(St)for(let nt=0,vt=J.length;nt<vt;nt++){const xt=n.get(J[nt]);xt.__webglTexture===void 0&&(xt.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&mt(A)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let nt=0;nt<J.length;nt++){const vt=J[nt];F.__webglColorRenderbuffer[nt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[nt]);const xt=r.convert(vt.format,vt.colorSpace),tt=r.convert(vt.type),ht=M(vt.internalFormat,xt,tt,vt.colorSpace,A.isXRRenderTarget===!0),Lt=de(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Lt,ht,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+nt,i.RENDERBUFFER,F.__webglColorRenderbuffer[nt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Pt(F.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(G){e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),zt(i.TEXTURE_CUBE_MAP,y);for(let nt=0;nt<6;nt++)if(y.mipmaps&&y.mipmaps.length>0)for(let vt=0;vt<y.mipmaps.length;vt++)Ct(F.__webglFramebuffer[nt][vt],A,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,vt);else Ct(F.__webglFramebuffer[nt],A,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);g(y)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let nt=0,vt=J.length;nt<vt;nt++){const xt=J[nt],tt=n.get(xt);let ht=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ht=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,tt.__webglTexture),zt(ht,xt),Ct(F.__webglFramebuffer,A,xt,i.COLOR_ATTACHMENT0+nt,ht,0),g(xt)&&p(ht)}e.unbindTexture()}else{let nt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(nt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(nt,W.__webglTexture),zt(nt,y),y.mipmaps&&y.mipmaps.length>0)for(let vt=0;vt<y.mipmaps.length;vt++)Ct(F.__webglFramebuffer[vt],A,y,i.COLOR_ATTACHMENT0,nt,vt);else Ct(F.__webglFramebuffer,A,y,i.COLOR_ATTACHMENT0,nt,0);g(y)&&p(nt),e.unbindTexture()}A.depthBuffer&&ye(A)}function ce(A){const y=A.textures;for(let F=0,W=y.length;F<W;F++){const J=y[F];if(g(J)){const G=v(A),St=n.get(J).__webglTexture;e.bindTexture(G,St),p(G),e.unbindTexture()}}}const Et=[],Jt=[];function bt(A){if(A.samples>0){if(mt(A)===!1){const y=A.textures,F=A.width,W=A.height;let J=i.COLOR_BUFFER_BIT;const G=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=n.get(A),nt=y.length>1;if(nt)for(let xt=0;xt<y.length;xt++)e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer);const vt=A.texture.mipmaps;vt&&vt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let xt=0;xt<y.length;xt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),nt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,St.__webglColorRenderbuffer[xt]);const tt=n.get(y[xt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,tt,0)}i.blitFramebuffer(0,0,F,W,0,0,F,W,J,i.NEAREST),l===!0&&(Et.length=0,Jt.length=0,Et.push(i.COLOR_ATTACHMENT0+xt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Et.push(G),Jt.push(G),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Jt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Et))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),nt)for(let xt=0;xt<y.length;xt++){e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,St.__webglColorRenderbuffer[xt]);const tt=n.get(y[xt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,tt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const y=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function de(A){return Math.min(s.maxSamples,A.samples)}function mt(A){const y=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Ht(A){const y=o.render.frame;h.get(A)!==y&&(h.set(A,y),A.update())}function De(A,y){const F=A.colorSpace,W=A.format,J=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||F!==Qe&&F!==ei&&(Kt.getTransfer(F)===ne?(W!==vn||J!==Gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),y}function Se(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=O,this.setTexture2D=Y,this.setTexture2DArray=q,this.setTexture3D=j,this.setTextureCube=H,this.rebindTextures=Yt,this.setupRenderTarget=L,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=bt,this.setupDepthRenderbuffer=ye,this.setupFrameBufferTexture=Ct,this.useMultisampledRTT=mt}function rx(i,t){function e(n,s=ei){let r;const o=Kt.getTransfer(s);if(n===Gn)return i.UNSIGNED_BYTE;if(n===kc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===zc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Vu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===zu)return i.BYTE;if(n===Hu)return i.SHORT;if(n===ir)return i.UNSIGNED_SHORT;if(n===Bc)return i.INT;if(n===Vi)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===si)return i.HALF_FLOAT;if(n===Gu)return i.ALPHA;if(n===Wu)return i.RGB;if(n===vn)return i.RGBA;if(n===rr)return i.DEPTH_COMPONENT;if(n===or)return i.DEPTH_STENCIL;if(n===Hc)return i.RED;if(n===Vc)return i.RED_INTEGER;if(n===Xu)return i.RG;if(n===Gc)return i.RG_INTEGER;if(n===Wc)return i.RGBA_INTEGER;if(n===ro||n===oo||n===ao||n===co)if(o===ne)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ro)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ro)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ao)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===co)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ya||n===ja||n===$a||n===Ja)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ya)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ja)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$a)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ja)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Za||n===Qa||n===tc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Za||n===Qa)return o===ne?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===tc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ec||n===nc||n===ic||n===sc||n===rc||n===oc||n===ac||n===cc||n===lc||n===hc||n===uc||n===dc||n===fc||n===pc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ec)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===nc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ic)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===sc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===rc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===oc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ac)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===cc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===lc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===hc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===uc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===dc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===fc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===pc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===lo||n===mc||n===gc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===lo)return o===ne?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===mc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===gc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===qu||n===_c||n===vc||n===xc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===lo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===_c)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===vc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===xc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===sr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Sd extends Pe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}}const ox=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ax=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class cx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Sd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Oe({vertexShader:ox,fragmentShader:ax,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new $(new ai(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class lx extends Wi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const _=new cx,g={},p=e.getContextAttributes();let v=null,M=null;const x=[],T=[],E=new ut;let C=null;const I=new Ye;I.viewport=new Zt;const S=new Ye;S.viewport=new Zt;const b=[I,S],P=new gm;let O=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let at=x[X];return at===void 0&&(at=new ra,x[X]=at),at.getTargetRaySpace()},this.getControllerGrip=function(X){let at=x[X];return at===void 0&&(at=new ra,x[X]=at),at.getGripSpace()},this.getHand=function(X){let at=x[X];return at===void 0&&(at=new ra,x[X]=at),at.getHandSpace()};function V(X){const at=T.indexOf(X.inputSource);if(at===-1)return;const it=x[at];it!==void 0&&(it.update(X.inputSource,X.frame,c||o),it.dispatchEvent({type:X.type,data:X.inputSource}))}function Y(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",q);for(let X=0;X<x.length;X++){const at=T[X];at!==null&&(T[X]=null,x[X].disconnect(at))}O=null,z=null,_.reset();for(const X in g)delete g[X];t.setRenderTarget(v),f=null,d=null,u=null,s=null,M=null,oe.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",q),p.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(E),typeof XRWebGLBinding<"u"&&(u=new XRWebGLBinding(s,e)),u!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let it=null,Ct=null,Pt=null;p.depth&&(Pt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=p.stencil?or:rr,Ct=p.stencil?sr:Vi);const Ut={colorFormat:e.RGBA8,depthFormat:Pt,scaleFactor:r};d=u.createProjectionLayer(Ut),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new Dn(d.textureWidth,d.textureHeight,{format:vn,type:Gn,depthTexture:new ld(d.textureWidth,d.textureHeight,Ct,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const it={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,it),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Dn(f.framebufferWidth,f.framebufferHeight,{format:vn,type:Gn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),oe.setContext(s),oe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function q(X){for(let at=0;at<X.removed.length;at++){const it=X.removed[at],Ct=T.indexOf(it);Ct>=0&&(T[Ct]=null,x[Ct].disconnect(it))}for(let at=0;at<X.added.length;at++){const it=X.added[at];let Ct=T.indexOf(it);if(Ct===-1){for(let Ut=0;Ut<x.length;Ut++)if(Ut>=T.length){T.push(it),Ct=Ut;break}else if(T[Ut]===null){T[Ut]=it,Ct=Ut;break}if(Ct===-1)break}const Pt=x[Ct];Pt&&Pt.connect(it)}}const j=new R,H=new R;function ot(X,at,it){j.setFromMatrixPosition(at.matrixWorld),H.setFromMatrixPosition(it.matrixWorld);const Ct=j.distanceTo(H),Pt=at.projectionMatrix.elements,Ut=it.projectionMatrix.elements,ye=Pt[14]/(Pt[10]-1),Yt=Pt[14]/(Pt[10]+1),L=(Pt[9]+1)/Pt[5],ce=(Pt[9]-1)/Pt[5],Et=(Pt[8]-1)/Pt[0],Jt=(Ut[8]+1)/Ut[0],bt=ye*Et,de=ye*Jt,mt=Ct/(-Et+Jt),Ht=mt*-Et;if(at.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ht),X.translateZ(mt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Pt[10]===-1)X.projectionMatrix.copy(at.projectionMatrix),X.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{const De=ye+mt,Se=Yt+mt,A=bt-Ht,y=de+(Ct-Ht),F=L*Yt/Se*De,W=ce*Yt/Se*De;X.projectionMatrix.makePerspective(A,y,F,W,De,Se),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function dt(X,at){at===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(at.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let at=X.near,it=X.far;_.texture!==null&&(_.depthNear>0&&(at=_.depthNear),_.depthFar>0&&(it=_.depthFar)),P.near=S.near=I.near=at,P.far=S.far=I.far=it,(O!==P.near||z!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),O=P.near,z=P.far),P.layers.mask=X.layers.mask|6,I.layers.mask=P.layers.mask&3,S.layers.mask=P.layers.mask&5;const Ct=X.parent,Pt=P.cameras;dt(P,Ct);for(let Ut=0;Ut<Pt.length;Ut++)dt(Pt[Ut],Ct);Pt.length===2?ot(P,I,S):P.projectionMatrix.copy(I.projectionMatrix),wt(X,P,Ct)};function wt(X,at,it){it===null?X.matrix.copy(at.matrixWorld):(X.matrix.copy(it.matrixWorld),X.matrix.invert(),X.matrix.multiply(at.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(at.projectionMatrix),X.projectionMatrixInverse.copy(at.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=ys*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(P)},this.getCameraTexture=function(X){return g[X]};let zt=null;function ue(X,at){if(h=at.getViewerPose(c||o),m=at,h!==null){const it=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let Ct=!1;it.length!==P.cameras.length&&(P.cameras.length=0,Ct=!0);for(let Yt=0;Yt<it.length;Yt++){const L=it[Yt];let ce=null;if(f!==null)ce=f.getViewport(L);else{const Jt=u.getViewSubImage(d,L);ce=Jt.viewport,Yt===0&&(t.setRenderTargetTextures(M,Jt.colorTexture,Jt.depthStencilTexture),t.setRenderTarget(M))}let Et=b[Yt];Et===void 0&&(Et=new Ye,Et.layers.enable(Yt),Et.viewport=new Zt,b[Yt]=Et),Et.matrix.fromArray(L.transform.matrix),Et.matrix.decompose(Et.position,Et.quaternion,Et.scale),Et.projectionMatrix.fromArray(L.projectionMatrix),Et.projectionMatrixInverse.copy(Et.projectionMatrix).invert(),Et.viewport.set(ce.x,ce.y,ce.width,ce.height),Yt===0&&(P.matrix.copy(Et.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Ct===!0&&P.cameras.push(Et)}const Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&u){const Yt=u.getDepthInformation(it[0]);Yt&&Yt.isValid&&Yt.texture&&_.init(Yt,s.renderState)}if(Pt&&Pt.includes("camera-access")&&(t.state.unbindTexture(),u))for(let Yt=0;Yt<it.length;Yt++){const L=it[Yt].camera;if(L){let ce=g[L];ce||(ce=new Sd,g[L]=ce);const Et=u.getCameraImage(L);ce.sourceTexture=Et}}}for(let it=0;it<x.length;it++){const Ct=T[it],Pt=x[it];Ct!==null&&Pt!==void 0&&Pt.update(Ct,at,c||o)}zt&&zt(X,at),at.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:at}),m=null}const oe=new _d;oe.setAnimationLoop(ue),this.setAnimationLoop=function(X){zt=X},this.dispose=function(){}}}const Ii=new Mn,hx=new Rt;function ux(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,ed(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,v,M,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,v,M):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===je&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===je&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const v=t.get(p),M=v.envMap,x=v.envMapRotation;M&&(g.envMap.value=M,Ii.copy(x),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),g.envMapRotation.value.setFromMatrix4(hx.makeRotationFromEuler(Ii)),g.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,v,M){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=M*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===je&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const v=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function dx(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,M){const x=M.program;n.uniformBlockBinding(v,x)}function c(v,M){let x=s[v.id];x===void 0&&(m(v),x=h(v),s[v.id]=x,v.addEventListener("dispose",g));const T=M.program;n.updateUBOMapping(v,T);const E=t.render.frame;r[v.id]!==E&&(d(v),r[v.id]=E)}function h(v){const M=u();v.__bindingPointIndex=M;const x=i.createBuffer(),T=v.__size,E=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,T,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,x),x}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const M=s[v.id],x=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let E=0,C=x.length;E<C;E++){const I=Array.isArray(x[E])?x[E]:[x[E]];for(let S=0,b=I.length;S<b;S++){const P=I[S];if(f(P,E,S,T)===!0){const O=P.__offset,z=Array.isArray(P.value)?P.value:[P.value];let V=0;for(let Y=0;Y<z.length;Y++){const q=z[Y],j=_(q);typeof q=="number"||typeof q=="boolean"?(P.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,O+V,P.__data)):q.isMatrix3?(P.__data[0]=q.elements[0],P.__data[1]=q.elements[1],P.__data[2]=q.elements[2],P.__data[3]=0,P.__data[4]=q.elements[3],P.__data[5]=q.elements[4],P.__data[6]=q.elements[5],P.__data[7]=0,P.__data[8]=q.elements[6],P.__data[9]=q.elements[7],P.__data[10]=q.elements[8],P.__data[11]=0):(q.toArray(P.__data,V),V+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,M,x,T){const E=v.value,C=M+"_"+x;if(T[C]===void 0)return typeof E=="number"||typeof E=="boolean"?T[C]=E:T[C]=E.clone(),!0;{const I=T[C];if(typeof E=="number"||typeof E=="boolean"){if(I!==E)return T[C]=E,!0}else if(I.equals(E)===!1)return I.copy(E),!0}return!1}function m(v){const M=v.uniforms;let x=0;const T=16;for(let C=0,I=M.length;C<I;C++){const S=Array.isArray(M[C])?M[C]:[M[C]];for(let b=0,P=S.length;b<P;b++){const O=S[b],z=Array.isArray(O.value)?O.value:[O.value];for(let V=0,Y=z.length;V<Y;V++){const q=z[V],j=_(q),H=x%T,ot=H%j.boundary,dt=H+ot;x+=ot,dt!==0&&T-dt<j.storage&&(x+=T-dt),O.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=j.storage}}}const E=x%T;return E>0&&(x+=T-E),v.__size=x,v.__cache={},this}function _(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function g(v){const M=v.target;M.removeEventListener("dispose",g);const x=o.indexOf(M.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class fx{constructor(t={}){const{canvas:e=Jf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const v=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let T=!1;this._outputColorSpace=Re;let E=0,C=0,I=null,S=-1,b=null;const P=new Zt,O=new Zt;let z=null;const V=new yt(0);let Y=0,q=e.width,j=e.height,H=1,ot=null,dt=null;const wt=new Zt(0,0,q,j),zt=new Zt(0,0,q,j);let ue=!1;const oe=new ur;let X=!1,at=!1;const it=new Rt,Ct=new R,Pt=new Zt,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ye=!1;function Yt(){return I===null?H:1}let L=n;function ce(w,N){return e.getContext(w,N)}try{const w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Fc}`),e.addEventListener("webglcontextlost",st,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",Z,!1),L===null){const N="webgl2";if(L=ce(N,w),L===null)throw ce(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Et,Jt,bt,de,mt,Ht,De,Se,A,y,F,W,J,G,St,nt,vt,xt,tt,ht,Lt,Mt,ct,Ot;function D(){Et=new b_(L),Et.init(),Mt=new rx(L,Et),Jt=new g_(L,Et,t,Mt),bt=new ix(L,Et),Jt.reversedDepthBuffer&&d&&bt.buffers.depth.setReversed(!0),de=new E_(L),mt=new Wv,Ht=new sx(L,Et,bt,mt,Jt,Mt,de),De=new v_(x),Se=new S_(x),A=new Lm(L),ct=new p_(L,A),y=new w_(L,A,de,ct),F=new R_(L,y,A,de),tt=new A_(L,Jt,Ht),nt=new __(mt),W=new Gv(x,De,Se,Et,Jt,ct,nt),J=new ux(x,mt),G=new qv,St=new Zv(Et),xt=new f_(x,De,Se,bt,F,f,l),vt=new ex(x,F,Jt),Ot=new dx(L,de,Jt,bt),ht=new m_(L,Et,de),Lt=new T_(L,Et,de),de.programs=W.programs,x.capabilities=Jt,x.extensions=Et,x.properties=mt,x.renderLists=G,x.shadowMap=vt,x.state=bt,x.info=de}D();const et=new lx(x,L);this.xr=et,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const w=Et.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Et.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(w){w!==void 0&&(H=w,this.setSize(q,j,!1))},this.getSize=function(w){return w.set(q,j)},this.setSize=function(w,N,B=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=w,j=N,e.width=Math.floor(w*H),e.height=Math.floor(N*H),B===!0&&(e.style.width=w+"px",e.style.height=N+"px"),this.setViewport(0,0,w,N)},this.getDrawingBufferSize=function(w){return w.set(q*H,j*H).floor()},this.setDrawingBufferSize=function(w,N,B){q=w,j=N,H=B,e.width=Math.floor(w*B),e.height=Math.floor(N*B),this.setViewport(0,0,w,N)},this.getCurrentViewport=function(w){return w.copy(P)},this.getViewport=function(w){return w.copy(wt)},this.setViewport=function(w,N,B,k){w.isVector4?wt.set(w.x,w.y,w.z,w.w):wt.set(w,N,B,k),bt.viewport(P.copy(wt).multiplyScalar(H).round())},this.getScissor=function(w){return w.copy(zt)},this.setScissor=function(w,N,B,k){w.isVector4?zt.set(w.x,w.y,w.z,w.w):zt.set(w,N,B,k),bt.scissor(O.copy(zt).multiplyScalar(H).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(w){bt.setScissorTest(ue=w)},this.setOpaqueSort=function(w){ot=w},this.setTransparentSort=function(w){dt=w},this.getClearColor=function(w){return w.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor(...arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha(...arguments)},this.clear=function(w=!0,N=!0,B=!0){let k=0;if(w){let U=!1;if(I!==null){const Q=I.texture.format;U=Q===Wc||Q===Gc||Q===Vc}if(U){const Q=I.texture.type,lt=Q===Gn||Q===Vi||Q===ir||Q===sr||Q===kc||Q===zc,gt=xt.getClearColor(),ft=xt.getClearAlpha(),It=gt.r,Dt=gt.g,Tt=gt.b;lt?(m[0]=It,m[1]=Dt,m[2]=Tt,m[3]=ft,L.clearBufferuiv(L.COLOR,0,m)):(_[0]=It,_[1]=Dt,_[2]=Tt,_[3]=ft,L.clearBufferiv(L.COLOR,0,_))}else k|=L.COLOR_BUFFER_BIT}N&&(k|=L.DEPTH_BUFFER_BIT),B&&(k|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",Z,!1),xt.dispose(),G.dispose(),St.dispose(),mt.dispose(),De.dispose(),Se.dispose(),F.dispose(),ct.dispose(),Ot.dispose(),W.dispose(),et.dispose(),et.removeEventListener("sessionstart",Fn),et.removeEventListener("sessionend",_l),wi.stop()};function st(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const w=de.autoReset,N=vt.enabled,B=vt.autoUpdate,k=vt.needsUpdate,U=vt.type;D(),de.autoReset=w,vt.enabled=N,vt.autoUpdate=B,vt.needsUpdate=k,vt.type=U}function Z(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function K(w){const N=w.target;N.removeEventListener("dispose",K),_t(N)}function _t(w){Ft(w),mt.remove(w)}function Ft(w){const N=mt.get(w).programs;N!==void 0&&(N.forEach(function(B){W.releaseProgram(B)}),w.isShaderMaterial&&W.releaseShaderCache(w))}this.renderBufferDirect=function(w,N,B,k,U,Q){N===null&&(N=Ut);const lt=U.isMesh&&U.matrixWorld.determinant()<0,gt=Wd(w,N,B,k,U);bt.setMaterial(k,lt);let ft=B.index,It=1;if(k.wireframe===!0){if(ft=y.getWireframeAttribute(B),ft===void 0)return;It=2}const Dt=B.drawRange,Tt=B.attributes.position;let qt=Dt.start*It,re=(Dt.start+Dt.count)*It;Q!==null&&(qt=Math.max(qt,Q.start*It),re=Math.min(re,(Q.start+Q.count)*It)),ft!==null?(qt=Math.max(qt,0),re=Math.min(re,ft.count)):Tt!=null&&(qt=Math.max(qt,0),re=Math.min(re,Tt.count));const ve=re-qt;if(ve<0||ve===1/0)return;ct.setup(U,k,gt,B,ft);let he,ae=ht;if(ft!==null&&(he=A.get(ft),ae=Lt,ae.setIndex(he)),U.isMesh)k.wireframe===!0?(bt.setLineWidth(k.wireframeLinewidth*Yt()),ae.setMode(L.LINES)):ae.setMode(L.TRIANGLES);else if(U.isLine){let At=k.linewidth;At===void 0&&(At=1),bt.setLineWidth(At*Yt()),U.isLineSegments?ae.setMode(L.LINES):U.isLineLoop?ae.setMode(L.LINE_LOOP):ae.setMode(L.LINE_STRIP)}else U.isPoints?ae.setMode(L.POINTS):U.isSprite&&ae.setMode(L.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)ds("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ae.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Et.get("WEBGL_multi_draw"))ae.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const At=U._multiDrawStarts,me=U._multiDrawCounts,$t=U._multiDrawCount,on=ft?A.get(ft).bytesPerElement:1,Xi=mt.get(k).currentProgram.getUniforms();for(let an=0;an<$t;an++)Xi.setValue(L,"_gl_DrawID",an),ae.render(At[an]/on,me[an])}else if(U.isInstancedMesh)ae.renderInstances(qt,ve,U.count);else if(B.isInstancedBufferGeometry){const At=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,me=Math.min(B.instanceCount,At);ae.renderInstances(qt,ve,me)}else ae.render(qt,ve)};function le(w,N,B){w.transparent===!0&&w.side===fe&&w.forceSinglePass===!1?(w.side=je,w.needsUpdate=!0,mr(w,N,B),w.side=oi,w.needsUpdate=!0,mr(w,N,B),w.side=fe):mr(w,N,B)}this.compile=function(w,N,B=null){B===null&&(B=w),p=St.get(B),p.init(N),M.push(p),B.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),w!==B&&w.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights();const k=new Set;return w.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const Q=U.material;if(Q)if(Array.isArray(Q))for(let lt=0;lt<Q.length;lt++){const gt=Q[lt];le(gt,B,U),k.add(gt)}else le(Q,B,U),k.add(Q)}),p=M.pop(),k},this.compileAsync=function(w,N,B=null){const k=this.compile(w,N,B);return new Promise(U=>{function Q(){if(k.forEach(function(lt){mt.get(lt).currentProgram.isReady()&&k.delete(lt)}),k.size===0){U(w);return}setTimeout(Q,10)}Et.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Qt=null;function Xn(w){Qt&&Qt(w)}function Fn(){wi.stop()}function _l(){wi.start()}const wi=new _d;wi.setAnimationLoop(Xn),typeof self<"u"&&wi.setContext(self),this.setAnimationLoop=function(w){Qt=w,et.setAnimationLoop(w),w===null?wi.stop():wi.start()},et.addEventListener("sessionstart",Fn),et.addEventListener("sessionend",_l),this.render=function(w,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(N),N=et.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,N,I),p=St.get(w,M.length),p.init(N),M.push(p),it.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),oe.setFromProjectionMatrix(it,zn,N.reversedDepth),at=this.localClippingEnabled,X=nt.init(this.clippingPlanes,at),g=G.get(w,v.length),g.init(),v.push(g),et.enabled===!0&&et.isPresenting===!0){const Q=x.xr.getDepthSensingMesh();Q!==null&&Fo(Q,N,-1/0,x.sortObjects)}Fo(w,N,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(ot,dt),ye=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,ye&&xt.addToRenderList(g,w),this.info.render.frame++,X===!0&&nt.beginShadows();const B=p.state.shadowsArray;vt.render(B,w,N),X===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=g.opaque,U=g.transmissive;if(p.setupLights(),N.isArrayCamera){const Q=N.cameras;if(U.length>0)for(let lt=0,gt=Q.length;lt<gt;lt++){const ft=Q[lt];xl(k,U,w,ft)}ye&&xt.render(w);for(let lt=0,gt=Q.length;lt<gt;lt++){const ft=Q[lt];vl(g,w,ft,ft.viewport)}}else U.length>0&&xl(k,U,w,N),ye&&xt.render(w),vl(g,w,N);I!==null&&C===0&&(Ht.updateMultisampleRenderTarget(I),Ht.updateRenderTargetMipmap(I)),w.isScene===!0&&w.onAfterRender(x,w,N),ct.resetDefaultState(),S=-1,b=null,M.pop(),M.length>0?(p=M[M.length-1],X===!0&&nt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function Fo(w,N,B,k){if(w.visible===!1)return;if(w.layers.test(N.layers)){if(w.isGroup)B=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(N);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||oe.intersectsSprite(w)){k&&Pt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(it);const lt=F.update(w),gt=w.material;gt.visible&&g.push(w,lt,gt,B,Pt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||oe.intersectsObject(w))){const lt=F.update(w),gt=w.material;if(k&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Pt.copy(w.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),Pt.copy(lt.boundingSphere.center)),Pt.applyMatrix4(w.matrixWorld).applyMatrix4(it)),Array.isArray(gt)){const ft=lt.groups;for(let It=0,Dt=ft.length;It<Dt;It++){const Tt=ft[It],qt=gt[Tt.materialIndex];qt&&qt.visible&&g.push(w,lt,qt,B,Pt.z,Tt)}}else gt.visible&&g.push(w,lt,gt,B,Pt.z,null)}}const Q=w.children;for(let lt=0,gt=Q.length;lt<gt;lt++)Fo(Q[lt],N,B,k)}function vl(w,N,B,k){const U=w.opaque,Q=w.transmissive,lt=w.transparent;p.setupLightsView(B),X===!0&&nt.setGlobalState(x.clippingPlanes,B),k&&bt.viewport(P.copy(k)),U.length>0&&pr(U,N,B),Q.length>0&&pr(Q,N,B),lt.length>0&&pr(lt,N,B),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function xl(w,N,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[k.id]===void 0&&(p.state.transmissionRenderTarget[k.id]=new Dn(1,1,{generateMipmaps:!0,type:Et.has("EXT_color_buffer_half_float")||Et.has("EXT_color_buffer_float")?si:Gn,minFilter:kn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));const Q=p.state.transmissionRenderTarget[k.id],lt=k.viewport||P;Q.setSize(lt.z*x.transmissionResolutionScale,lt.w*x.transmissionResolutionScale);const gt=x.getRenderTarget(),ft=x.getActiveCubeFace(),It=x.getActiveMipmapLevel();x.setRenderTarget(Q),x.getClearColor(V),Y=x.getClearAlpha(),Y<1&&x.setClearColor(16777215,.5),x.clear(),ye&&xt.render(B);const Dt=x.toneMapping;x.toneMapping=Si;const Tt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),p.setupLightsView(k),X===!0&&nt.setGlobalState(x.clippingPlanes,k),pr(w,B,k),Ht.updateMultisampleRenderTarget(Q),Ht.updateRenderTargetMipmap(Q),Et.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let re=0,ve=N.length;re<ve;re++){const he=N[re],ae=he.object,At=he.geometry,me=he.material,$t=he.group;if(me.side===fe&&ae.layers.test(k.layers)){const on=me.side;me.side=je,me.needsUpdate=!0,Ml(ae,B,k,At,me,$t),me.side=on,me.needsUpdate=!0,qt=!0}}qt===!0&&(Ht.updateMultisampleRenderTarget(Q),Ht.updateRenderTargetMipmap(Q))}x.setRenderTarget(gt,ft,It),x.setClearColor(V,Y),Tt!==void 0&&(k.viewport=Tt),x.toneMapping=Dt}function pr(w,N,B){const k=N.isScene===!0?N.overrideMaterial:null;for(let U=0,Q=w.length;U<Q;U++){const lt=w[U],gt=lt.object,ft=lt.geometry,It=lt.group;let Dt=lt.material;Dt.allowOverride===!0&&k!==null&&(Dt=k),gt.layers.test(B.layers)&&Ml(gt,N,B,ft,Dt,It)}}function Ml(w,N,B,k,U,Q){w.onBeforeRender(x,N,B,k,U,Q),w.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),U.onBeforeRender(x,N,B,k,w,Q),U.transparent===!0&&U.side===fe&&U.forceSinglePass===!1?(U.side=je,U.needsUpdate=!0,x.renderBufferDirect(B,N,k,U,w,Q),U.side=oi,U.needsUpdate=!0,x.renderBufferDirect(B,N,k,U,w,Q),U.side=fe):x.renderBufferDirect(B,N,k,U,w,Q),w.onAfterRender(x,N,B,k,U,Q)}function mr(w,N,B){N.isScene!==!0&&(N=Ut);const k=mt.get(w),U=p.state.lights,Q=p.state.shadowsArray,lt=U.state.version,gt=W.getParameters(w,U.state,Q,N,B),ft=W.getProgramCacheKey(gt);let It=k.programs;k.environment=w.isMeshStandardMaterial?N.environment:null,k.fog=N.fog,k.envMap=(w.isMeshStandardMaterial?Se:De).get(w.envMap||k.environment),k.envMapRotation=k.environment!==null&&w.envMap===null?N.environmentRotation:w.envMapRotation,It===void 0&&(w.addEventListener("dispose",K),It=new Map,k.programs=It);let Dt=It.get(ft);if(Dt!==void 0){if(k.currentProgram===Dt&&k.lightsStateVersion===lt)return Sl(w,gt),Dt}else gt.uniforms=W.getUniforms(w),w.onBeforeCompile(gt,x),Dt=W.acquireProgram(gt,ft),It.set(ft,Dt),k.uniforms=gt.uniforms;const Tt=k.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Tt.clippingPlanes=nt.uniform),Sl(w,gt),k.needsLights=qd(w),k.lightsStateVersion=lt,k.needsLights&&(Tt.ambientLightColor.value=U.state.ambient,Tt.lightProbe.value=U.state.probe,Tt.directionalLights.value=U.state.directional,Tt.directionalLightShadows.value=U.state.directionalShadow,Tt.spotLights.value=U.state.spot,Tt.spotLightShadows.value=U.state.spotShadow,Tt.rectAreaLights.value=U.state.rectArea,Tt.ltc_1.value=U.state.rectAreaLTC1,Tt.ltc_2.value=U.state.rectAreaLTC2,Tt.pointLights.value=U.state.point,Tt.pointLightShadows.value=U.state.pointShadow,Tt.hemisphereLights.value=U.state.hemi,Tt.directionalShadowMap.value=U.state.directionalShadowMap,Tt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Tt.spotShadowMap.value=U.state.spotShadowMap,Tt.spotLightMatrix.value=U.state.spotLightMatrix,Tt.spotLightMap.value=U.state.spotLightMap,Tt.pointShadowMap.value=U.state.pointShadowMap,Tt.pointShadowMatrix.value=U.state.pointShadowMatrix),k.currentProgram=Dt,k.uniformsList=null,Dt}function yl(w){if(w.uniformsList===null){const N=w.currentProgram.getUniforms();w.uniformsList=uo.seqWithValue(N.seq,w.uniforms)}return w.uniformsList}function Sl(w,N){const B=mt.get(w);B.outputColorSpace=N.outputColorSpace,B.batching=N.batching,B.batchingColor=N.batchingColor,B.instancing=N.instancing,B.instancingColor=N.instancingColor,B.instancingMorph=N.instancingMorph,B.skinning=N.skinning,B.morphTargets=N.morphTargets,B.morphNormals=N.morphNormals,B.morphColors=N.morphColors,B.morphTargetsCount=N.morphTargetsCount,B.numClippingPlanes=N.numClippingPlanes,B.numIntersection=N.numClipIntersection,B.vertexAlphas=N.vertexAlphas,B.vertexTangents=N.vertexTangents,B.toneMapping=N.toneMapping}function Wd(w,N,B,k,U){N.isScene!==!0&&(N=Ut),Ht.resetTextureUnits();const Q=N.fog,lt=k.isMeshStandardMaterial?N.environment:null,gt=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Qe,ft=(k.isMeshStandardMaterial?Se:De).get(k.envMap||lt),It=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Dt=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Tt=!!B.morphAttributes.position,qt=!!B.morphAttributes.normal,re=!!B.morphAttributes.color;let ve=Si;k.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ve=x.toneMapping);const he=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ae=he!==void 0?he.length:0,At=mt.get(k),me=p.state.lights;if(X===!0&&(at===!0||w!==b)){const Xe=w===b&&k.id===S;nt.setState(k,w,Xe)}let $t=!1;k.version===At.__version?(At.needsLights&&At.lightsStateVersion!==me.state.version||At.outputColorSpace!==gt||U.isBatchedMesh&&At.batching===!1||!U.isBatchedMesh&&At.batching===!0||U.isBatchedMesh&&At.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&At.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&At.instancing===!1||!U.isInstancedMesh&&At.instancing===!0||U.isSkinnedMesh&&At.skinning===!1||!U.isSkinnedMesh&&At.skinning===!0||U.isInstancedMesh&&At.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&At.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&At.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&At.instancingMorph===!1&&U.morphTexture!==null||At.envMap!==ft||k.fog===!0&&At.fog!==Q||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==nt.numPlanes||At.numIntersection!==nt.numIntersection)||At.vertexAlphas!==It||At.vertexTangents!==Dt||At.morphTargets!==Tt||At.morphNormals!==qt||At.morphColors!==re||At.toneMapping!==ve||At.morphTargetsCount!==ae)&&($t=!0):($t=!0,At.__version=k.version);let on=At.currentProgram;$t===!0&&(on=mr(k,N,U));let Xi=!1,an=!1,Ns=!1;const ge=on.getUniforms(),pn=At.uniforms;if(bt.useProgram(on.program)&&(Xi=!0,an=!0,Ns=!0),k.id!==S&&(S=k.id,an=!0),Xi||b!==w){bt.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ge.setValue(L,"projectionMatrix",w.projectionMatrix),ge.setValue(L,"viewMatrix",w.matrixWorldInverse);const tn=ge.map.cameraPosition;tn!==void 0&&tn.setValue(L,Ct.setFromMatrixPosition(w.matrixWorld)),Jt.logarithmicDepthBuffer&&ge.setValue(L,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ge.setValue(L,"isOrthographic",w.isOrthographicCamera===!0),b!==w&&(b=w,an=!0,Ns=!0)}if(U.isSkinnedMesh){ge.setOptional(L,U,"bindMatrix"),ge.setOptional(L,U,"bindMatrixInverse");const Xe=U.skeleton;Xe&&(Xe.boneTexture===null&&Xe.computeBoneTexture(),ge.setValue(L,"boneTexture",Xe.boneTexture,Ht))}U.isBatchedMesh&&(ge.setOptional(L,U,"batchingTexture"),ge.setValue(L,"batchingTexture",U._matricesTexture,Ht),ge.setOptional(L,U,"batchingIdTexture"),ge.setValue(L,"batchingIdTexture",U._indirectTexture,Ht),ge.setOptional(L,U,"batchingColorTexture"),U._colorsTexture!==null&&ge.setValue(L,"batchingColorTexture",U._colorsTexture,Ht));const mn=B.morphAttributes;if((mn.position!==void 0||mn.normal!==void 0||mn.color!==void 0)&&tt.update(U,B,on),(an||At.receiveShadow!==U.receiveShadow)&&(At.receiveShadow=U.receiveShadow,ge.setValue(L,"receiveShadow",U.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(pn.envMap.value=ft,pn.flipEnvMap.value=ft.isCubeTexture&&ft.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&N.environment!==null&&(pn.envMapIntensity.value=N.environmentIntensity),an&&(ge.setValue(L,"toneMappingExposure",x.toneMappingExposure),At.needsLights&&Xd(pn,Ns),Q&&k.fog===!0&&J.refreshFogUniforms(pn,Q),J.refreshMaterialUniforms(pn,k,H,j,p.state.transmissionRenderTarget[w.id]),uo.upload(L,yl(At),pn,Ht)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(uo.upload(L,yl(At),pn,Ht),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ge.setValue(L,"center",U.center),ge.setValue(L,"modelViewMatrix",U.modelViewMatrix),ge.setValue(L,"normalMatrix",U.normalMatrix),ge.setValue(L,"modelMatrix",U.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Xe=k.uniformsGroups;for(let tn=0,Oo=Xe.length;tn<Oo;tn++){const Ti=Xe[tn];Ot.update(Ti,on),Ot.bind(Ti,on)}}return on}function Xd(w,N){w.ambientLightColor.needsUpdate=N,w.lightProbe.needsUpdate=N,w.directionalLights.needsUpdate=N,w.directionalLightShadows.needsUpdate=N,w.pointLights.needsUpdate=N,w.pointLightShadows.needsUpdate=N,w.spotLights.needsUpdate=N,w.spotLightShadows.needsUpdate=N,w.rectAreaLights.needsUpdate=N,w.hemisphereLights.needsUpdate=N}function qd(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(w,N,B){const k=mt.get(w);k.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),mt.get(w.texture).__webglTexture=N,mt.get(w.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:B,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,N){const B=mt.get(w);B.__webglFramebuffer=N,B.__useDefaultFramebuffer=N===void 0};const Kd=L.createFramebuffer();this.setRenderTarget=function(w,N=0,B=0){I=w,E=N,C=B;let k=!0,U=null,Q=!1,lt=!1;if(w){const ft=mt.get(w);if(ft.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(L.FRAMEBUFFER,null),k=!1;else if(ft.__webglFramebuffer===void 0)Ht.setupRenderTarget(w);else if(ft.__hasExternalTextures)Ht.rebindTextures(w,mt.get(w.texture).__webglTexture,mt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Tt=w.depthTexture;if(ft.__boundDepthTexture!==Tt){if(Tt!==null&&mt.has(Tt)&&(w.width!==Tt.image.width||w.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ht.setupDepthRenderbuffer(w)}}const It=w.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(lt=!0);const Dt=mt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Dt[N])?U=Dt[N][B]:U=Dt[N],Q=!0):w.samples>0&&Ht.useMultisampledRTT(w)===!1?U=mt.get(w).__webglMultisampledFramebuffer:Array.isArray(Dt)?U=Dt[B]:U=Dt,P.copy(w.viewport),O.copy(w.scissor),z=w.scissorTest}else P.copy(wt).multiplyScalar(H).floor(),O.copy(zt).multiplyScalar(H).floor(),z=ue;if(B!==0&&(U=Kd),bt.bindFramebuffer(L.FRAMEBUFFER,U)&&k&&bt.drawBuffers(w,U),bt.viewport(P),bt.scissor(O),bt.setScissorTest(z),Q){const ft=mt.get(w.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,ft.__webglTexture,B)}else if(lt){const ft=N;for(let It=0;It<w.textures.length;It++){const Dt=mt.get(w.textures[It]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+It,Dt.__webglTexture,B,ft)}}else if(w!==null&&B!==0){const ft=mt.get(w.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ft.__webglTexture,B)}S=-1},this.readRenderTargetPixels=function(w,N,B,k,U,Q,lt,gt=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=mt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&lt!==void 0&&(ft=ft[lt]),ft){bt.bindFramebuffer(L.FRAMEBUFFER,ft);try{const It=w.textures[gt],Dt=It.format,Tt=It.type;if(!Jt.textureFormatReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Jt.textureTypeReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=w.width-k&&B>=0&&B<=w.height-U&&(w.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+gt),L.readPixels(N,B,k,U,Mt.convert(Dt),Mt.convert(Tt),Q))}finally{const It=I!==null?mt.get(I).__webglFramebuffer:null;bt.bindFramebuffer(L.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(w,N,B,k,U,Q,lt,gt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=mt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&lt!==void 0&&(ft=ft[lt]),ft)if(N>=0&&N<=w.width-k&&B>=0&&B<=w.height-U){bt.bindFramebuffer(L.FRAMEBUFFER,ft);const It=w.textures[gt],Dt=It.format,Tt=It.type;if(!Jt.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Jt.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,qt),L.bufferData(L.PIXEL_PACK_BUFFER,Q.byteLength,L.STREAM_READ),w.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+gt),L.readPixels(N,B,k,U,Mt.convert(Dt),Mt.convert(Tt),0);const re=I!==null?mt.get(I).__webglFramebuffer:null;bt.bindFramebuffer(L.FRAMEBUFFER,re);const ve=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Zf(L,ve,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,qt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Q),L.deleteBuffer(qt),L.deleteSync(ve),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,N=null,B=0){const k=Math.pow(2,-B),U=Math.floor(w.image.width*k),Q=Math.floor(w.image.height*k),lt=N!==null?N.x:0,gt=N!==null?N.y:0;Ht.setTexture2D(w,0),L.copyTexSubImage2D(L.TEXTURE_2D,B,0,0,lt,gt,U,Q),bt.unbindTexture()};const Yd=L.createFramebuffer(),jd=L.createFramebuffer();this.copyTextureToTexture=function(w,N,B=null,k=null,U=0,Q=null){Q===null&&(U!==0?(ds("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=U,U=0):Q=0);let lt,gt,ft,It,Dt,Tt,qt,re,ve;const he=w.isCompressedTexture?w.mipmaps[Q]:w.image;if(B!==null)lt=B.max.x-B.min.x,gt=B.max.y-B.min.y,ft=B.isBox3?B.max.z-B.min.z:1,It=B.min.x,Dt=B.min.y,Tt=B.isBox3?B.min.z:0;else{const mn=Math.pow(2,-U);lt=Math.floor(he.width*mn),gt=Math.floor(he.height*mn),w.isDataArrayTexture?ft=he.depth:w.isData3DTexture?ft=Math.floor(he.depth*mn):ft=1,It=0,Dt=0,Tt=0}k!==null?(qt=k.x,re=k.y,ve=k.z):(qt=0,re=0,ve=0);const ae=Mt.convert(N.format),At=Mt.convert(N.type);let me;N.isData3DTexture?(Ht.setTexture3D(N,0),me=L.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Ht.setTexture2DArray(N,0),me=L.TEXTURE_2D_ARRAY):(Ht.setTexture2D(N,0),me=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);const $t=L.getParameter(L.UNPACK_ROW_LENGTH),on=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Xi=L.getParameter(L.UNPACK_SKIP_PIXELS),an=L.getParameter(L.UNPACK_SKIP_ROWS),Ns=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,he.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,he.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,It),L.pixelStorei(L.UNPACK_SKIP_ROWS,Dt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Tt);const ge=w.isDataArrayTexture||w.isData3DTexture,pn=N.isDataArrayTexture||N.isData3DTexture;if(w.isDepthTexture){const mn=mt.get(w),Xe=mt.get(N),tn=mt.get(mn.__renderTarget),Oo=mt.get(Xe.__renderTarget);bt.bindFramebuffer(L.READ_FRAMEBUFFER,tn.__webglFramebuffer),bt.bindFramebuffer(L.DRAW_FRAMEBUFFER,Oo.__webglFramebuffer);for(let Ti=0;Ti<ft;Ti++)ge&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,mt.get(w).__webglTexture,U,Tt+Ti),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,mt.get(N).__webglTexture,Q,ve+Ti)),L.blitFramebuffer(It,Dt,lt,gt,qt,re,lt,gt,L.DEPTH_BUFFER_BIT,L.NEAREST);bt.bindFramebuffer(L.READ_FRAMEBUFFER,null),bt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(U!==0||w.isRenderTargetTexture||mt.has(w)){const mn=mt.get(w),Xe=mt.get(N);bt.bindFramebuffer(L.READ_FRAMEBUFFER,Yd),bt.bindFramebuffer(L.DRAW_FRAMEBUFFER,jd);for(let tn=0;tn<ft;tn++)ge?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,mn.__webglTexture,U,Tt+tn):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,mn.__webglTexture,U),pn?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Xe.__webglTexture,Q,ve+tn):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Xe.__webglTexture,Q),U!==0?L.blitFramebuffer(It,Dt,lt,gt,qt,re,lt,gt,L.COLOR_BUFFER_BIT,L.NEAREST):pn?L.copyTexSubImage3D(me,Q,qt,re,ve+tn,It,Dt,lt,gt):L.copyTexSubImage2D(me,Q,qt,re,It,Dt,lt,gt);bt.bindFramebuffer(L.READ_FRAMEBUFFER,null),bt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else pn?w.isDataTexture||w.isData3DTexture?L.texSubImage3D(me,Q,qt,re,ve,lt,gt,ft,ae,At,he.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(me,Q,qt,re,ve,lt,gt,ft,ae,he.data):L.texSubImage3D(me,Q,qt,re,ve,lt,gt,ft,ae,At,he):w.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,Q,qt,re,lt,gt,ae,At,he.data):w.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,Q,qt,re,he.width,he.height,ae,he.data):L.texSubImage2D(L.TEXTURE_2D,Q,qt,re,lt,gt,ae,At,he);L.pixelStorei(L.UNPACK_ROW_LENGTH,$t),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,on),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Xi),L.pixelStorei(L.UNPACK_SKIP_ROWS,an),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ns),Q===0&&N.generateMipmaps&&L.generateMipmap(me),bt.unbindTexture()},this.copyTextureToTexture3D=function(w,N,B=null,k=null,U=0){return ds('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,N,B,k,U)},this.initRenderTarget=function(w){mt.get(w).__webglFramebuffer===void 0&&Ht.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Ht.setTextureCube(w,0):w.isData3DTexture?Ht.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Ht.setTexture2DArray(w,0):Ht.setTexture2D(w,0),bt.unbindTexture()},this.resetState=function(){E=0,C=0,I=null,bt.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}const fo={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ds{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const px=new Po(-1,1,1,-1,0,1);class mx extends be{constructor(){super(),this.setAttribute("position",new Wt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Wt([0,2,0,0,2,0],2))}}const gx=new mx;class cl{constructor(t){this._mesh=new $(gx,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,px)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class _x extends Ds{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof Oe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=bs.clone(t.uniforms),this.material=new Oe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new cl(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class kh extends Ds{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class vx extends Ds{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class xx{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new ut);this._width=n.width,this._height=n.height,e=new Dn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:si}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new _x(fo),this.copyPass.material.blending=ii,this.clock=new gd}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}kh!==void 0&&(o instanceof kh?n=!0:o instanceof vx&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ut);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Mx extends Ds{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new yt}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const yx={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new yt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class As extends Ds{constructor(t,e=1,n,s){super(),this.strength=e,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new ut(t.x,t.y):new ut(256,256),this.clearColor=new yt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Dn(r,o,{type:si}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new Dn(r,o,{type:si});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new Dn(r,o,{type:si});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),o=Math.round(o/2)}const a=yx;this.highPassUniforms=bs.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Oe({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ut(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=bs.clone(fo.uniforms),this.blendMaterial=new Oe({uniforms:this.copyUniforms,vertexShader:fo.vertexShader,fragmentShader:fo.fragmentShader,blending:se,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new yt,this._oldClearAlpha=1,this._basic=new Nt,this._fsQuad=new cl(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ut(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=As.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=As.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Oe({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new ut(.5,.5)},direction:{value:new ut(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(t){return new Oe({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}As.BlurDirectionX=new ut(1,0);As.BlurDirectionY=new ut(0,1);const Wr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Sx extends Ds{constructor(){super(),this.uniforms=bs.clone(Wr.uniforms),this.material=new jp({name:Wr.name,uniforms:this.uniforms,vertexShader:Wr.vertexShader,fragmentShader:Wr.fragmentShader}),this._fsQuad=new cl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Kt.getTransfer(this._outputColorSpace)===ne&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Lu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Du?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Nu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Oc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Fu?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ou?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Uu&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class bx{constructor(t){this.canvas=t,this.keys=new Set,this.pressed=new Set,this.mouseDX=0,this.mouseDY=0,this.pointerLocked=!1,this.mobileMove={x:0,y:0},this.mobileActions=new Set,this.isCoarse=matchMedia("(pointer: coarse)").matches,this._bind()}_restoreCursor(){this.canvas?.style&&(this.canvas.style.cursor=""),document.documentElement?.style&&(document.documentElement.style.cursor=""),document.body?.style&&(document.body.style.cursor="")}_syncPointerLockState(){this.pointerLocked=document.pointerLockElement===this.canvas,this.pointerLocked||(this.mouseDX=0,this.mouseDY=0,this._restoreCursor())}requestPointerLock(){if(!(this.isCoarse||document.hidden||document.pointerLockElement===this.canvas))try{this.canvas.requestPointerLock?.()?.catch?.(()=>this._syncPointerLockState())}catch{this._syncPointerLockState()}}releasePointerLock(){if(this.pointerLocked=!1,this.mouseDX=0,this.mouseDY=0,this._restoreCursor(),document.pointerLockElement===this.canvas)try{document.exitPointerLock?.()}catch{}}_bind(){addEventListener("keydown",s=>{s.code==="Escape"&&this.releasePointerLock(),this.keys.has(s.code)||this.pressed.add(s.code),this.keys.add(s.code),["Space","KeyW","KeyA","KeyS","KeyD"].includes(s.code)&&s.preventDefault()}),addEventListener("keyup",s=>this.keys.delete(s.code)),this.canvas.addEventListener("mousedown",s=>{s.button===0&&this.pressed.add("Mouse0"),this.requestPointerLock()}),document.addEventListener("pointerlockchange",()=>this._syncPointerLockState()),document.addEventListener("pointerlockerror",()=>this._syncPointerLockState()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.releasePointerLock()}),addEventListener("blur",()=>this.releasePointerLock()),addEventListener("pagehide",()=>this.releasePointerLock()),addEventListener("beforeunload",()=>this.releasePointerLock()),document.addEventListener("mousemove",s=>{this.pointerLocked&&(this.mouseDX+=s.movementX,this.mouseDY+=s.movementY)});const t=document.querySelector("#joystick"),e=document.querySelector("#joystick-knob");if(t&&e){let s=null;const r=a=>{const l=t.getBoundingClientRect(),c=l.left+l.width/2,h=l.top+l.height/2;let u=a.clientX-c,d=a.clientY-h;const f=l.width*.32,m=Math.hypot(u,d)||1;m>f&&(u=u/m*f,d=d/m*f),this.mobileMove.x=u/f,this.mobileMove.y=-d/f,e.style.transform=`translate(${u}px, ${d}px)`};t.addEventListener("pointerdown",a=>{s=a.pointerId,t.setPointerCapture(a.pointerId),r(a)}),t.addEventListener("pointermove",a=>{a.pointerId===s&&r(a)});const o=a=>{a.pointerId===s&&(s=null,this.mobileMove.x=this.mobileMove.y=0,e.style.transform="translate(0px, 0px)")};t.addEventListener("pointerup",o),t.addEventListener("pointercancel",o)}document.querySelectorAll(".mobile-actions button").forEach(s=>{s.addEventListener("pointerdown",r=>{r.preventDefault(),this.mobileActions.add(s.dataset.action)})});let n=null;this.canvas.addEventListener("touchstart",s=>{s.touches.length===1&&s.touches[0].clientX>innerWidth*.35&&(n={id:s.touches[0].identifier,x:s.touches[0].clientX,y:s.touches[0].clientY})},{passive:!0}),this.canvas.addEventListener("touchmove",s=>{if(!n)return;const r=[...s.touches].find(o=>o.identifier===n.id);r&&(this.mouseDX+=(r.clientX-n.x)*1.55,this.mouseDY+=(r.clientY-n.y)*1.55,n.x=r.clientX,n.y=r.clientY)},{passive:!0}),this.canvas.addEventListener("touchend",s=>{n&&([...s.touches].some(r=>r.identifier===n.id)||(n=null))},{passive:!0})}getMove(){let t=0,e=0;this.keys.has("KeyA")&&(t+=1),this.keys.has("KeyD")&&(t-=1),this.keys.has("KeyW")&&(e+=1),this.keys.has("KeyS")&&(e-=1),t-=this.mobileMove.x,e+=this.mobileMove.y;const n=Math.hypot(t,e);return n>1&&(t/=n,e/=n),{x:t,y:e}}consume(t){const n={attack:["Mouse0","Digit1","KeyF"],spell:["KeyQ"],dodge:["Space"]}[t]||[];for(const s of n)if(this.pressed.has(s))return this.pressed.delete(s),!0;return this.mobileActions.has(t)?(this.mobileActions.delete(t),!0):!1}consumeLook(){const t={x:this.mouseDX,y:-this.mouseDY};return this.mouseDX=this.mouseDY=0,t}endFrame(){this.pressed.clear(),this.mobileActions.clear()}}class wx{constructor(){this.ctx=null,this.master=null,this.unlocked=!1}unlock(){if(this.unlocked)return;const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=.16,this.master.connect(this.ctx.destination),this.unlocked=!0)}tone(t=220,e=.08,n="sine",s=.15,r=0){if(!this.unlocked)return;const o=this.ctx.currentTime,a=this.ctx.createOscillator(),l=this.ctx.createGain();a.type=n,a.frequency.setValueAtTime(t,o),r&&a.frequency.exponentialRampToValueAtTime(Math.max(20,t+r),o+e),l.gain.setValueAtTime(s,o),l.gain.exponentialRampToValueAtTime(.001,o+e),a.connect(l),l.connect(this.master),a.start(o),a.stop(o+e+.02)}noise(t=.06,e=.08,n=1200){if(!this.unlocked)return;const s=Math.max(1,Math.floor(this.ctx.sampleRate*t)),r=this.ctx.createBuffer(1,s,this.ctx.sampleRate),o=r.getChannelData(0);for(let h=0;h<s;h++)o[h]=(Math.random()*2-1)*(1-h/s);const a=this.ctx.createBufferSource();a.buffer=r;const l=this.ctx.createBiquadFilter();l.type="bandpass",l.frequency.value=n,l.Q.value=.7;const c=this.ctx.createGain();c.gain.value=e,a.connect(l),l.connect(c),c.connect(this.master),a.start()}swing(t=0){this.noise(.085,.12,1100+t*260),this.tone(180+t*35,.07,"triangle",.08,280)}hit(t=!1){this.noise(.07,t?.18:.11,t?700:900),this.tone(t?95:125,.1,"square",t?.12:.07,-45)}spell(){this.tone(260,.18,"sine",.12,460),this.tone(520,.2,"triangle",.06,600),this.noise(.15,.05,1900)}dash(){this.noise(.11,.08,1600),this.tone(150,.1,"sine",.04,120)}hurt(){this.tone(95,.18,"sawtooth",.08,-25)}pickup(){this.tone(660,.09,"sine",.05,220)}level(){[392,523,659,784].forEach((t,e)=>setTimeout(()=>this.tone(t,.18,"sine",.06,80),e*70))}boss(){this.tone(65,.8,"sawtooth",.08,-20)}}const gi=R;class bd{constructor(t){this.scene=t,this.effects=[],this.clock=0,this._geo={orb:new Fe(.09,8,6),spark:new il(.07,0),slash:new dn(1.05,.045,6,36,Math.PI*.92),ring:new Gi(.6,.68,36),shard:new Ce(.055,.35,5)}}add(t,e,n){return this.scene.add(t),this.effects.push({obj:t,life:e,maxLife:e,updater:n}),t}burst(t,e=16760440,n=14,s=4,r=1){for(let o=0;o<n;o++){const a=new Nt({color:e,transparent:!0,opacity:1,depthWrite:!1,blending:se}),l=new $(o%3===0?this._geo.shard:this._geo.spark,a);l.scale.setScalar(r*(.6+Math.random()*.8)),l.position.copy(t).add(new gi((Math.random()-.5)*.3,Math.random()*.3,(Math.random()-.5)*.3));const c=new gi((Math.random()-.5)*s,Math.random()*s*.75+.4,(Math.random()-.5)*s),h=new gi(Math.random()*8,Math.random()*8,Math.random()*8);this.add(l,.35+Math.random()*.35,(u,d,f)=>{c.y-=8*d,u.obj.position.addScaledVector(c,d),u.obj.rotation.x+=h.x*d,u.obj.rotation.y+=h.y*d,u.obj.rotation.z+=h.z*d,u.obj.material.opacity=Math.pow(1-f,1.5),u.obj.scale.multiplyScalar(1-d*1.8)})}}slash(t,e,n=0){const s=[14221282,11071439,16765051],r=new Nt({color:s[n%3],transparent:!0,opacity:.9,side:fe,depthWrite:!1,blending:se}),o=new $(this._geo.slash,r);o.position.copy(t).add(new gi(0,1.15,0)),o.rotation.set(Math.PI/2.5,e-Math.PI*.46,n===2?-.65:.25),o.scale.setScalar(n===2?1.25:1),this.add(o,.16,(a,l,c)=>{a.obj.scale.multiplyScalar(1+l*5),a.obj.material.opacity=(1-c)*.9})}ring(t,e=8188625,n=.3,s=3.2,r=.35){const o=new Nt({color:e,transparent:!0,opacity:.8,side:fe,depthWrite:!1,blending:se}),a=new $(this._geo.ring,o);a.rotation.x=-Math.PI/2,a.position.copy(t).add(new gi(0,.04,0)),a.scale.setScalar(n),this.add(a,r,(l,c,h)=>{const u=jt.lerp(n,s,1-Math.pow(1-h,2));l.obj.scale.setScalar(u),l.obj.material.opacity=(1-h)*.75})}dashTrail(t,e=9033703){const n=new Nt({color:e,transparent:!0,opacity:.34,depthWrite:!1,blending:se}),s=new $(new Cn(.34,.9,4,8),n);s.position.copy(t).add(new gi(0,.8,0)),s.rotation.z=Math.PI/2,this.add(s,.22,(r,o,a)=>{r.obj.material.opacity=(1-a)*.3,r.obj.scale.multiplyScalar(1+o*1.5)})}projectileTrail(t,e=16748119){const n=new Nt({color:e,transparent:!0,opacity:.65,depthWrite:!1,blending:se}),s=new $(this._geo.orb,n);s.position.copy(t),s.scale.setScalar(.6+Math.random()*.9),this.add(s,.22,(r,o,a)=>{r.obj.material.opacity=(1-a)*.65,r.obj.scale.setScalar(Math.max(.02,(1-a)*1.2))})}heal(t){for(let e=0;e<10;e++){const n=new Nt({color:9306045,transparent:!0,opacity:.8,depthWrite:!1,blending:se}),s=new $(this._geo.orb,n);s.position.copy(t).add(new gi((Math.random()-.5)*.8,.2+Math.random()*.6,(Math.random()-.5)*.8));const r=Math.random()*Math.PI*2;this.add(s,.8+Math.random()*.5,(o,a,l)=>{o.obj.position.y+=a*(.8+Math.random()*.3),o.obj.position.x+=Math.sin(this.clock*5+r)*a*.25,o.obj.material.opacity=Math.sin(Math.PI*l)*.75})}}levelUp(t){this.ring(t,16768384,.4,4.2,.7),this.ring(t,9633744,.2,2.7,.9);for(let e=0;e<26;e++){const n=Math.random()*Math.PI*2,s=.4+Math.random()*1.1,r=new Nt({color:e%2?16767353:10613200,transparent:!0,depthWrite:!1,blending:se}),o=new $(this._geo.spark,r);o.position.copy(t).add(new gi(Math.cos(n)*s,.2+Math.random()*.4,Math.sin(n)*s));const a=1.5+Math.random()*3;this.add(o,1+Math.random()*.5,(l,c,h)=>{l.obj.position.y+=a*c,l.obj.rotation.y+=c*7,l.obj.material.opacity=1-h})}}update(t){this.clock+=t;for(let e=this.effects.length-1;e>=0;e--){const n=this.effects[e];n.life-=t;const s=1-Math.max(0,n.life)/n.maxLife;n.updater?.(n,t,s),n.life<=0&&(this.scene.remove(n.obj),n.obj.traverse?.(r=>{r.material?.dispose&&r.userData.disposeMaterial&&r.material.dispose()}),this.effects.splice(e,1))}}}class Lo extends ${constructor(){const t=Lo.SkyShader,e=new Oe({name:t.name,uniforms:bs.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:je,depthWrite:!1});super(new Ee(1,1,1),e),this.isSky=!0}}Lo.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new R},up:{value:new R(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calculation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorption + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function hn(i,t=.8,e=0,n=0,s=0){return new Ze({color:i,roughness:t,metalness:e,emissive:n,emissiveIntensity:s,flatShading:!0})}class Tx{constructor(t,e,n="high"){this.scene=t,this.renderer=e,this.quality=n,this.decor=new Gt,this.scene.add(this.decor),this.portal=null,this.portalRing=null,this.portalLight=null,this.fireflies=[],this.time=0,this.arenaRadius=28,this._build()}_build(){this.scene.background=new yt(9086624),this.scene.fog=new Jc(7902861,.022);const t=new Lo;t.scale.setScalar(420);const e=t.material.uniforms;e.turbidity.value=5.2,e.rayleigh.value=1.35,e.mieCoefficient.value=.007,e.mieDirectionalG.value=.86;const n=new R;n.setFromSphericalCoords(1,jt.degToRad(66),jt.degToRad(225)),e.sunPosition.value.copy(n),this.scene.add(t);const s=new Ze({color:15331042,roughness:1,transparent:!0,opacity:.42,depthWrite:!1,flatShading:!0});for(let m=0;m<(this.quality==="high"?14:7);m++){const _=new Gt,g=m/14*Math.PI*2+.3,p=46+Math.random()*30;_.position.set(Math.cos(g)*p,18+Math.random()*12,Math.sin(g)*p);for(let v=0;v<3+Math.floor(Math.random()*3);v++){const M=new $(new We(2.5+Math.random()*2.8,1),s);M.scale.set(1.8+Math.random(),.45+.2*Math.random(),1),M.position.set(v*2.6+(Math.random()-.5)*2,(Math.random()-.5)*1.2,(Math.random()-.5)*2),_.add(M)}this.scene.add(_)}const r=new hm(13428697,2701100,1.7);this.scene.add(r);const o=new So(16771003,4.1);o.position.set(-18,28,13),o.castShadow=!0;const a=this.renderer.shadowMap.type===Ao?22:18;o.shadow.mapSize.set(this.quality==="high"?2048:1024,this.quality==="high"?2048:1024),o.shadow.camera.left=-a,o.shadow.camera.right=a,o.shadow.camera.top=a,o.shadow.camera.bottom=-a,o.shadow.camera.near=1,o.shadow.camera.far=75,o.shadow.bias=-25e-5,this.scene.add(o);const l=new So(8247241,.85);l.position.set(15,10,-15),this.scene.add(l);const c=new Ze({color:4614483,roughness:.98,metalness:0,flatShading:!0}),h=new $(new Ue(30,31,1,48,1,!1),c);h.position.y=-.55,h.receiveShadow=!0,this.decor.add(h);const u=new $(new bi(21,40),hn(5797210,.98));u.rotation.x=-Math.PI/2,u.position.y=.008,u.receiveShadow=!0,this.decor.add(u);const d=hn(7438453,.94);for(let m=0;m<17;m++){const _=15-m*1.8,g=Math.sin(m*.58)*2.1,p=new $(new Ue(1.05+Math.random()*.45,1.1+Math.random()*.45,.12,6),d);p.position.set(g,.065,_),p.scale.z=.72,p.rotation.y=Math.random()*.8,p.receiveShadow=!0,p.castShadow=!0,this.decor.add(p)}this._buildRuin(-8,0,-6,1),this._buildRuin(10,0,5,.78),this._buildShrine(0,0,-17);for(let m=0;m<(this.quality==="high"?42:28);m++){const _=m/(this.quality==="high"?42:28)*Math.PI*2+(Math.random()-.5)*.12,g=22.5+Math.random()*6.7;Math.abs(Math.sin(_))<.14&&Math.cos(_)>.4||this._tree(Math.cos(_)*g,Math.sin(_)*g,.8+Math.random()*.75,m)}[[-14,-4],[14,-8],[-11,10],[12,13],[-5,-14],[17,2]].forEach(([m,_],g)=>this._tree(m,_,.72+Math.random()*.35,80+g));const f=hn(6121825,.95);for(let m=0;m<(this.quality==="high"?34:20);m++){const _=Math.random()*Math.PI*2,g=7+Math.random()*21,p=new $(new zi(.3+Math.random()*.7,0),f);p.position.set(Math.cos(_)*g,.12,Math.sin(_)*g),p.scale.set(1,.6+Math.random()*.8,.8+Math.random()*.7),p.rotation.set(Math.random(),Math.random()*6,Math.random()),p.castShadow=!0,p.receiveShadow=!0,this.decor.add(p)}for(let m=0;m<(this.quality==="high"?50:28);m++)this._plant(m);for(let m=0;m<9;m++)this._crystal(m);this._buildPortal(),this._buildFireflies()}_tree(t,e,n=1,s=0){const r=new Gt;r.position.set(t,0,e),r.scale.setScalar(n),r.rotation.y=s*2.37%6.28;const o=hn(s%3===0?5851195:6705214,.98),a=new $(new Ue(.36,.56,4.2,7),o);a.position.y=2.1,a.castShadow=!0,a.receiveShadow=!0,r.add(a);for(let c=0;c<4;c++){const h=new $(new Ce(.22,1.15,5),o);h.rotation.z=Math.PI/2.7,h.rotation.y=c*Math.PI/2+.3,h.position.set(Math.cos(c*Math.PI/2)*.45,.18,Math.sin(c*Math.PI/2)*.45),h.castShadow=!0,r.add(h)}const l=[3106125,3766106,4685401,2973008];for(let c=0;c<5;c++){const h=new $(new We(1.6+c%2*.25,1),hn(l[(s+c)%l.length],.9)),u=c/5*Math.PI*2;h.position.set(Math.cos(u)*.82,4.15+c%3*.48,Math.sin(u)*.82),h.scale.set(1.05,.85,1.05),h.castShadow=!0,h.receiveShadow=!0,r.add(h)}if(s%5===0){const c=new $(new Fe(.08,8,6),new Nt({color:16766851}));c.position.set(.65,3.05,.2),r.add(c)}this.decor.add(r)}_plant(t){const e=Math.random()*Math.PI*2,n=4+Math.random()*23,s=Math.cos(e)*n,r=Math.sin(e)*n;if(t%4===0){const o=new Gt;o.position.set(s,0,r),o.rotation.y=Math.random()*6;const a=new $(new Fe(.23,8,5,0,Math.PI*2,0,Math.PI/2),hn(t%8===0?13922147:13148507,.8));a.position.y=.28,a.scale.y=.55,o.add(a);const l=new $(new Ue(.055,.075,.26,6),hn(14733994,.9));l.position.y=.13,o.add(l),this.decor.add(o)}else{const o=new Gt;o.position.set(s,0,r);const a=hn(t%3?4092754:6128727,.95);for(let l=0;l<3;l++){const c=new $(new Ce(.08,.5,4),a);c.position.y=.22,c.rotation.z=(l-1)*.5,c.rotation.y=l*2.1,o.add(c)}this.decor.add(o)}}_crystal(t){const e=t/9*Math.PI*2+.35,n=15+t*3%5,s=Math.cos(e)*n,r=Math.sin(e)*n,o=new Gt;o.position.set(s,0,r);const a=t%2?6808509:15317347;for(let l=0;l<3;l++){const c=new $(new dr(.28+Math.random()*.18,0),new Ze({color:a,roughness:.25,emissive:a,emissiveIntensity:.35,flatShading:!0}));c.scale.y=2+Math.random()*1.6,c.position.set((l-1)*.28,.45+Math.random()*.2,(Math.random()-.5)*.25),c.rotation.z=(l-1)*.18,c.castShadow=!0,o.add(c)}this.decor.add(o)}_buildRuin(t,e,n,s){const r=new Gt;r.position.set(t,e,n),r.scale.setScalar(s),r.rotation.y=.25;const o=hn(7831926,.96),a=hn(5140560,.98),l=(u,d,f)=>{const m=new $(new Ue(.55,.68,.32,8),o);m.position.set(u,.16,d),m.castShadow=!0,r.add(m);const _=new $(new Ue(.36,.42,f,8),o);_.position.set(u,.32+f/2,d),_.castShadow=!0,r.add(_);const g=new $(new Ee(1,.25,.85),o);g.position.set(u,.32+f+.12,d),g.rotation.y=.1,g.castShadow=!0,r.add(g)};l(-1.7,0,2.6),l(1.7,0,1.75);const c=new $(new Ee(4.2,.42,.75),o);c.position.set(0,3.1,0),c.rotation.z=.05,c.castShadow=!0,r.add(c);const h=new $(new Ee(2.4,.09,.79),a);h.position.set(-.7,3.33,.02),r.add(h),this.decor.add(r)}_buildShrine(t,e,n){const s=new Gt;s.position.set(t,e,n);const r=hn(6846578,.9),o=hn(12624477,.42,.45,9399086,.08),a=new $(new Ue(3.3,3.7,.5,8),r);a.position.y=.25,a.castShadow=!0,a.receiveShadow=!0,s.add(a);for(let h=0;h<5;h++){const u=new $(new Ue(2.2-h*.25,2.45-h*.25,.23,8),r);u.position.y=.5+h*.17,u.castShadow=!0,s.add(u)}const l=new $(new Ue(.42,.65,3.6,6),r);l.position.y=2.7,l.castShadow=!0,s.add(l);const c=new $(new dn(.55,.06,6,24),o);c.position.set(0,3,.42),s.add(c),this.decor.add(s)}_buildPortal(){const t=new Gt;t.position.set(0,0,-18),this.decor.add(t),this.portal=t;const e=hn(6188391,.9),n=new $(new Ee(1.05,4.8,1.1),e);n.position.set(-2,2.4,0),n.rotation.z=-.06,n.castShadow=!0,t.add(n);const s=n.clone();s.position.x=2,s.rotation.z=.06,t.add(s);const r=new $(new Ee(4.5,.85,1.1),e);r.position.set(0,4.75,0),r.castShadow=!0,t.add(r);const o=new Nt({color:7990216,transparent:!0,opacity:.13,side:fe,blending:se,depthWrite:!1}),a=new $(new dn(1.55,.1,8,48),o);a.position.set(0,2.55,.02),t.add(a),this.portalRing=a;const l=new $(new bi(1.48,48),new Nt({color:6213814,transparent:!0,opacity:.03,side:fe,blending:se,depthWrite:!1}));l.position.set(0,2.55,.02),t.add(l),this.portalDisc=l;const c=new ci(7727813,0,8,2);c.position.set(0,2.5,1),t.add(c),this.portalLight=c}_buildFireflies(){const t=new Fe(.035,6,4);for(let e=0;e<(this.quality==="high"?34:20);e++){const n=e%5===0?16765306:9565641,s=new $(t,new Nt({color:n,transparent:!0,opacity:.5+Math.random()*.5})),r=Math.random()*Math.PI*2,o=5+Math.random()*24;s.position.set(Math.cos(r)*o,.5+Math.random()*4.5,Math.sin(r)*o),s.userData={base:s.position.clone(),phase:Math.random()*6.28,speed:.6+Math.random()*1.5},this.decor.add(s),this.fireflies.push(s)}}unlockPortal(){this.portal.userData.unlocked=!0}update(t){this.time+=t;for(const e of this.fireflies){const n=e.userData;e.position.x=n.base.x+Math.sin(this.time*n.speed+n.phase)*.45,e.position.y=n.base.y+Math.sin(this.time*n.speed*.7+n.phase*2)*.32,e.position.z=n.base.z+Math.cos(this.time*n.speed*.8+n.phase)*.4,e.material.opacity=.3+.55*(.5+.5*Math.sin(this.time*2+n.phase))}if(this.portal?.userData.unlocked){const e=.5+.5*Math.sin(this.time*2.8);this.portalRing.material.opacity=.48+e*.25,this.portalRing.rotation.z+=t*.25,this.portalDisc.material.opacity=.12+e*.08,this.portalLight.intensity=2.2+e*1.6}else this.portalRing.rotation.z+=t*.08}clampToArena(t){const e=Math.hypot(t.x,t.z);if(e>this.arenaRadius){const n=this.arenaRadius/e;t.x*=n,t.z*=n}}}const Gs=R,Li=jt.clamp,ze=jt.damp;function _i(i,t=.75,e=0,n=0,s=0){return new Ze({color:i,roughness:t,metalness:e,emissive:n,emissiveIntensity:s,flatShading:!0})}function xe(i,t,e=!0){const n=new $(i,t);return n.castShadow=e,n.receiveShadow=!0,n}class yn{constructor(t,e,n){this.scene=t,this.fx=e,this.audio=n,this.root=new Gt,t.add(this.root),this.root.position.set(0,0,9),this.velocity=new Gs,this.facing=0,this.speed=0,this.maxHp=100,this.hp=100,this.maxMana=100,this.mana=100,this.level=7,this.xp=0,this.xpToLevel=100,this.state="idle",this.stateTime=0,this.stateDuration=0,this.invuln=0,this.comboIndex=0,this.attackEventFired=!1,this.dodgeDir=new Gs,this.hitFlash=0,this.dead=!1,this._build()}_build(){const t=_i(15054736,.8),e=_i(3747370,.92),n=_i(3235669,.78),s=_i(10177859,.8),r=_i(5848623,.88),o=_i(13741405,.38,.55),a=_i(12965068,.3,.72),l=_i(1649963,.88);this.materials={skin:t,hair:e,tunic:n,cloth:s,leather:r,gold:o,steel:a,dark:l};const c=this.rig={};c.body=new Gt,c.body.position.y=1.15,this.root.add(c.body);const h=xe(new Cn(.38,.62,5,8),n);h.scale.set(1,.95,.74),c.body.add(h);const u=xe(new Ue(.39,.39,.16,10),r);u.position.y=-.36,u.scale.z=.82,c.body.add(u);const d=xe(new Ee(.13,.13,.055),o);d.position.set(0,-.36,.34),c.body.add(d);const f=xe(new ai(.72,1),s);f.position.set(0,-.1,-.31),f.rotation.x=.1,c.body.add(f),c.cape=f;const m=xe(new Fe(.28,8,6),o);m.scale.set(1.15,.7,.95),m.position.set(-.43,.24,0),c.body.add(m);const _=m.clone();_.position.x=.43,c.body.add(_),c.head=new Gt,c.head.position.y=2.04,this.root.add(c.head);const g=xe(new Fe(.33,10,8),t);g.scale.set(1,.95,.92),c.head.add(g);const p=xe(new We(.34,1),e);p.scale.set(1.05,.68,1),p.position.y=.19,c.head.add(p);for(let P=0;P<4;P++){const O=xe(new Ce(.08,.32,5),e);O.position.set(-.2+P*.13,.18,.25),O.rotation.x=-.55,O.rotation.z=(P-1.5)*.2,c.head.add(O)}const v=new Nt({color:2437679});[-1,1].forEach(P=>{const O=xe(new Fe(.025,6,4),v,!1);O.position.set(P*.12,.02,.3),c.head.add(O)}),c.armL=this._limb(-.48,1.44,t,n,r),c.armR=this._limb(.48,1.44,t,n,r),this.root.add(c.armL,c.armR),c.legL=this._leg(-.22,.68,n,r),c.legR=this._leg(.22,.68,n,r),this.root.add(c.legL,c.legR),c.weapon=new Gt,c.weapon.position.set(0,-.46,0),c.armR.add(c.weapon);const M=xe(new Ue(.045,.05,.32,7),r);M.rotation.z=Math.PI/2,c.weapon.add(M);const x=xe(new Ee(.08,.52,.08),o);x.rotation.z=Math.PI/2,x.position.x=.18,c.weapon.add(x);const T=xe(new Ee(.07,1.22,.12),a);T.position.set(.78,0,0),T.rotation.z=Math.PI/2,c.weapon.add(T);const E=xe(new Ce(.09,.28,4),a);E.position.set(1.53,0,0),E.rotation.z=-Math.PI/2,c.weapon.add(E);const C=xe(new Ee(.025,.46,.13),new Ze({color:7988677,emissive:6937020,emissiveIntensity:1.4,roughness:.2}),!1);C.position.set(.7,0,.01),C.rotation.z=Math.PI/2,c.weapon.add(C),c.swordGlow=C;const I=xe(new Ue(.44,.44,.1,8),l);I.rotation.x=Math.PI/2,I.position.set(0,1.25,-.35),I.rotation.z=.15,this.root.add(I);const S=xe(new dn(.39,.055,6,8),o);S.position.z=.06,I.add(S);const b=new $(new bi(.58,24),new Nt({color:1253918,transparent:!0,opacity:.24,depthWrite:!1}));b.rotation.x=-Math.PI/2,b.position.y=.015,b.scale.z=.72,this.root.add(b),this.shadow=b}_limb(t,e,n,s,r){const o=new Gt;o.position.set(t,e,0);const a=xe(new Cn(.13,.36,4,7),s);a.position.y=-.18,o.add(a);const l=new Gt;l.position.y=-.48,o.add(l),o.userData.fore=l;const c=xe(new Cn(.105,.32,4,7),n);c.position.y=-.18,l.add(c);const h=xe(new Fe(.13,7,5),r);return h.position.y=-.43,l.add(h),o}_leg(t,e,n,s){const r=new Gt;r.position.set(t,e,0);const o=xe(new Cn(.15,.4,4,7),n);o.position.y=-.2,r.add(o);const a=xe(new Cn(.13,.42,4,7),s);a.position.y=-.66,r.add(a);const l=xe(new Ee(.25,.18,.42),s);return l.position.set(0,-.9,.08),l.rotation.x=.08,r.add(l),r}setPosition(t,e,n){this.root.position.set(t,e,n)}get position(){return this.root.position}beginAttack(t){return this.dead||this.state==="dodge"?!1:(this.state="attack",this.stateTime=0,this.comboIndex=t%3,this.attackEventFired=!1,this.stateDuration=[.38,.42,.58][this.comboIndex],this.audio.swing(this.comboIndex),!0)}beginDodge(t){return this.dead||this.state==="attack"&&this.stateTime<.18?!1:(this.state="dodge",this.stateTime=0,this.stateDuration=.44,this.invuln=.4,this.dodgeDir.copy(t),this.dodgeDir.lengthSq()<.01&&this.dodgeDir.set(Math.sin(this.facing),0,Math.cos(this.facing)),this.dodgeDir.normalize(),this.audio.dash(),this.fx.ring(this.position,9297389,.18,1.1,.25),!0)}takeDamage(t,e){if(this.invuln>0||this.dead)return!1;if(this.hp=Math.max(0,this.hp-t),this.invuln=.52,this.hitFlash=.18,this.audio.hurt(),e){const n=this.position.clone().sub(e);n.y=0,n.lengthSq()>.01&&this.velocity.add(n.normalize().multiplyScalar(3.2))}return this.hp<=0?(this.dead=!0,this.state="dead",this.stateTime=0):(this.state="hurt",this.stateTime=0,this.stateDuration=.28),!0}addXp(t){this.xp+=t;let e=!1;return this.xp>=this.xpToLevel&&(this.xp-=this.xpToLevel,this.level++,this.xpToLevel=Math.round(this.xpToLevel*1.22),this.maxHp+=12,this.hp=this.maxHp,this.maxMana+=7,this.mana=this.maxMana,e=!0,this.fx.levelUp(this.position),this.audio.level()),e}update(t,e,n){this.invuln=Math.max(0,this.invuln-t),this.hitFlash=Math.max(0,this.hitFlash-t),this.mana=Math.min(this.maxMana,this.mana+t*8),this.stateTime+=t;const s=new Gs(Math.sin(n),0,Math.cos(n)),r=new Gs(Math.cos(n),0,-Math.sin(n)),o=s.multiplyScalar(e.y).add(r.multiplyScalar(e.x));o.lengthSq()>1&&o.normalize();let a=1;if(this.state==="attack"&&(a=this.comboIndex===2?.16:.34),(this.state==="hurt"||this.state==="dead")&&(a=0),this.state==="dodge"){const l=this.stateTime/this.stateDuration,c=jt.lerp(12.5,4.8,l);this.velocity.x=this.dodgeDir.x*c,this.velocity.z=this.dodgeDir.z*c,Math.floor(this.stateTime*35)!==Math.floor((this.stateTime-t)*35)&&this.fx.dashTrail(this.position),this.facing=Math.atan2(this.dodgeDir.x,this.dodgeDir.z)}else{const l=o.lengthSq()>.01?5.25*a:0,c=o.lengthSq()>.01?o.normalize():new Gs;if(this.velocity.x=ze(this.velocity.x,c.x*l,o.lengthSq()>.01?16:11,t),this.velocity.z=ze(this.velocity.z,c.z*l,o.lengthSq()>.01?16:11,t),o.lengthSq()>.01&&a>.25){let u=(Math.atan2(c.x,c.z)-this.facing+Math.PI)%(Math.PI*2)-Math.PI;this.facing+=u*(1-Math.exp(-t*14))}}this.root.position.addScaledVector(this.velocity,t),this.root.rotation.y=this.facing,this.speed=Math.hypot(this.velocity.x,this.velocity.z),["attack","dodge","hurt"].includes(this.state)&&this.stateTime>=this.stateDuration&&(this.state="idle",this.stateTime=0),this._animate(t)}_animate(t){const e=this.rig,n=performance.now()*.001,s=this.speed>.35&&!["attack","dodge","hurt","dead"].includes(this.state),r=n*(5.5+this.speed*.45),o=Li(this.speed/5.2,0,1)*.62;if(e.body.rotation.x=ze(e.body.rotation.x,0,12,t),e.body.rotation.y=ze(e.body.rotation.y,0,12,t),e.body.rotation.z=ze(e.body.rotation.z,0,12,t),e.head.rotation.x=ze(e.head.rotation.x,0,10,t),e.head.rotation.z=ze(e.head.rotation.z,0,10,t),e.armL.rotation.x=ze(e.armL.rotation.x,s?Math.sin(r)*o:.08,10,t),e.armR.rotation.x=ze(e.armR.rotation.x,s?-Math.sin(r)*o:-.12,10,t),e.armL.rotation.z=ze(e.armL.rotation.z,.08,10,t),e.armR.rotation.z=ze(e.armR.rotation.z,-.12,10,t),e.armR.rotation.y=ze(e.armR.rotation.y,0,10,t),e.armR.userData.fore.rotation.z=ze(e.armR.userData.fore.rotation.z,0,10,t),e.legL.rotation.x=ze(e.legL.rotation.x,s?-Math.sin(r)*o:0,11,t),e.legR.rotation.x=ze(e.legR.rotation.x,s?Math.sin(r)*o:0,11,t),this.root.position.y=ze(this.root.position.y,s?Math.abs(Math.sin(r*2))*.035:0,12,t),e.cape.rotation.x=.1+Math.min(.4,this.speed*.045)+Math.sin(n*3)*.025,e.swordGlow.material.emissiveIntensity=1.15+.55*Math.sin(n*5.5),this.state==="attack"&&this._attackPose(t),this.state==="dodge"){const a=this.stateTime/this.stateDuration;e.body.rotation.x=-.32*Math.sin(Math.PI*a),e.body.rotation.z=.12*Math.sin(Math.PI*a*2),e.armR.rotation.x=-1.15,e.armR.rotation.z=-.45,this.root.position.y=Math.sin(Math.PI*a)*.13}if(this.state==="hurt"){const a=this.stateTime/this.stateDuration;e.body.rotation.x=-.28*Math.sin(Math.PI*a),e.head.rotation.x=.25*Math.sin(Math.PI*a)}if(this.state==="dead"){const a=Li(this.stateTime/.8,0,1);e.body.rotation.z=jt.lerp(0,1.35,a),e.head.rotation.z=jt.lerp(0,.8,a),this.root.position.y=-.12*a}this.invuln>0&&Math.floor(this.invuln*24)%2===0?this.root.visible=!1:this.root.visible=!0}_attackPose(t){const e=this.rig,n=Li(this.stateTime/this.stateDuration,0,1);if(this.comboIndex===0){const s=Math.sin(Li((n-.08)/.68,0,1)*Math.PI);e.body.rotation.y=-.22+s*.5,e.body.rotation.z=-.08*s,e.armR.rotation.x=-1.15+s*.45,e.armR.rotation.z=-1.1+s*2,e.armR.rotation.y=-.35+s*.8,e.armR.userData.fore.rotation.z=-.45}else if(this.comboIndex===1){const s=Math.sin(Li((n-.07)/.68,0,1)*Math.PI);e.body.rotation.y=.25-s*.55,e.body.rotation.z=.1*s,e.armR.rotation.x=-.85+s*.2,e.armR.rotation.z=.95-s*2.15,e.armR.rotation.y=.45-s*.75,e.armR.userData.fore.rotation.z=-.25}else{const s=Li(n/.36,0,1),r=Li((n-.28)/.55,0,1);e.body.rotation.x=.18*s-.42*Math.sin(r*Math.PI),e.body.rotation.y=-.45*s+r*.9,e.armR.rotation.x=-2.15+r*1.3,e.armR.rotation.z=-.35+r*.85,e.armR.rotation.y=-.55+r*.5,e.armL.rotation.x=-.7*s,e.armL.rotation.z=.45*s,n>.5&&n<.82&&(this.root.position.y=Math.sin((n-.5)/.32*Math.PI)*.18)}}attackWindow(){if(this.state!=="attack"||this.attackEventFired)return!1;const t=this.stateTime/this.stateDuration,e=[.34,.32,.52][this.comboIndex];return t>=e?(this.attackEventFired=!0,!0):!1}}const Sa=R,Xr=jt.clamp,Zn=jt.damp;function On(i,t=.8,e=0,n=0,s=0){return new Ze({color:i,roughness:t,metalness:e,emissive:n,emissiveIntensity:s,flatShading:!0})}function Me(i,t){const e=new $(i,t);return e.castShadow=!0,e.receiveShadow=!0,e}class In{constructor(t,e,n,s,r="briarling"){this.scene=t,this.fx=e,this.audio=n,this.type=r,this.isBoss=r==="boss",this.root=new Gt,t.add(this.root),this.root.position.copy(s);const o=new Nt({color:this.isBoss?16740185:16758891,transparent:!0,opacity:0,side:fe,depthWrite:!1,blending:se});this.telegraph=new $(new Gi(this.isBoss?1.5:.62,this.isBoss?1.67:.72,28),o),this.telegraph.rotation.x=-Math.PI/2,this.telegraph.position.y=.025,this.root.add(this.telegraph),this.velocity=new Sa,this.facing=Math.random()*Math.PI*2,this.state="spawn",this.stateTime=0,this.stateDuration=.55,this.attackEvent=!1,this.attackSerial=0,this.dead=!1,this.remove=!1,this.hitFlash=0,this.maxHp=this.isBoss?650:58,this.hp=this.maxHp,this.speed=this.isBoss?1.55:2.15+Math.random()*.35,this.attackRange=this.isBoss?2.4:1.45,this.damage=this.isBoss?22:11,this.radius=this.isBoss?1.1:.55,this.reward=this.isBoss?180:22,this._build(),this.fx.ring(this.root.position,this.isBoss?16747111:7721121,.15,this.isBoss?2.8:1.3,.5)}_build(){if(this.isBoss)return this._buildBoss();const t=On(4484688,.9),e=On(6196063,.9),n=On(6506555,.95),s=On(9545573,.92),r=On(3620404,.86),o=new Nt({color:16045710});this.materials=[t,e,n,s,r],this.materials.forEach(d=>{d.userData.baseEmissive=d.emissive.getHex(),d.userData.baseEI=d.emissiveIntensity});const a=this.rig={};a.body=new Gt,a.body.position.y=.67,this.root.add(a.body);const l=Me(new We(.55,1),t);l.scale.set(1,.9,1.08),a.body.add(l);const c=Me(new Fe(.34,8,6),s);c.scale.set(1,.75,.3),c.position.set(0,-.05,.48),a.body.add(c),a.head=new Gt,a.head.position.set(0,1.18,.08),this.root.add(a.head);const h=Me(new We(.44,1),e);h.scale.set(1.05,.9,1),a.head.add(h),[-1,1].forEach(d=>{const f=Me(new Fe(.045,7,5),o);f.position.set(d*.15,.05,.4),a.head.add(f);const m=Me(new Ee(.16,.045,.045),n);m.position.set(d*.15,.14,.4),m.rotation.z=d*.25,a.head.add(m)}),[-1,1].forEach(d=>{const f=Me(new Ce(.16,.5,5),e);f.position.set(d*.38,.12,.02),f.rotation.z=-d*1.15,f.rotation.x=.15,a.head.add(f)});for(let d=0;d<3;d++){const f=Me(new Ce(.08,.42,5),r);f.position.set((d-1)*.18,.38,-.03),f.rotation.z=(d-1)*.28,a.head.add(f)}a.armL=this._claw(-.52,.72,n,r),a.armR=this._claw(.52,.72,n,r),this.root.add(a.armL,a.armR),a.legL=this._foot(-.25,.22,n),a.legR=this._foot(.25,.22,n),this.root.add(a.legL,a.legR);const u=new $(new bi(.58,18),new Nt({color:1253658,transparent:!0,opacity:.2,depthWrite:!1}));u.rotation.x=-Math.PI/2,u.position.y=.015,u.scale.z=.68,this.root.add(u),this.scaleBase=.82+Math.random()*.24,this.root.scale.setScalar(this.scaleBase)}_claw(t,e,n,s){const r=new Gt;r.position.set(t,e,0);const o=Me(new Cn(.1,.34,4,6),n);o.position.y=-.15,r.add(o);for(let a=-1;a<=1;a++){const l=Me(new Ce(.035,.23,4),s);l.position.set(a*.07,-.41,.06),l.rotation.x=Math.PI/2.5,r.add(l)}return r}_foot(t,e,n){const s=new Gt;s.position.set(t,e,0);const r=Me(new Fe(.2,7,5),n);return r.scale.set(1.2,.65,1.45),r.position.z=.07,s.add(r),s}_buildBoss(){const t=On(4865330,.96),e=On(6705469,.95),n=On(3493436,.96),s=On(11357766,.52,.1,9382692,.55),r=On(12036736,.86),o=new Nt({color:16757866});this.materials=[t,e,n,s,r],this.materials.forEach(d=>{d.userData.baseEmissive=d.emissive.getHex(),d.userData.baseEI=d.emissiveIntensity});const a=this.rig={};a.body=new Gt,a.body.position.y=1.45,this.root.add(a.body);const l=Me(new We(1.15,1),t);l.scale.set(1.05,1.15,.88),a.body.add(l);const c=Me(new We(.7,1),s);c.scale.set(.8,.72,.35),c.position.set(0,.05,.86),a.body.add(c);for(let d=0;d<5;d++){const f=Me(new Ee(.32,.8,.18),e);f.position.set((d-2)*.27,.12+Math.abs(d-2)*.06,.91),f.rotation.z=(d-2)*.07,a.body.add(f)}a.head=new Gt,a.head.position.set(0,2.7,.1),this.root.add(a.head);const h=Me(new We(.76,1),e);h.scale.set(1,.82,.9),a.head.add(h),[-1,1].forEach(d=>{const f=Me(new Fe(.075,7,5),o);f.position.set(d*.25,.03,.67),a.head.add(f);const m=Me(new Ce(.18,1.15,6),r);m.position.set(d*.62,.28,0),m.rotation.z=-d*.72,a.head.add(m)}),a.armL=this._bossArm(-1.15,1.65,t,e,r),a.armR=this._bossArm(1.15,1.65,t,e,r),this.root.add(a.armL,a.armR),a.legL=this._bossLeg(-.56,.62,t,r),a.legR=this._bossLeg(.56,.62,t,r),this.root.add(a.legL,a.legR);for(let d=0;d<5;d++){const f=Me(new Ce(.13,.9,5),r);f.position.set((d-2)*.38,1.65+Math.abs(d-2)*.25,-.75),f.rotation.x=-.65,f.rotation.z=(d-2)*.1,this.root.add(f)}const u=new $(new bi(1.45,24),new Nt({color:1314574,transparent:!0,opacity:.28,depthWrite:!1}));u.rotation.x=-Math.PI/2,u.position.y=.015,u.scale.z=.72,this.root.add(u),this.root.scale.setScalar(1.08)}_bossArm(t,e,n,s,r){const o=new Gt;o.position.set(t,e,0);const a=Me(new Cn(.28,.65,5,8),n);a.position.y=-.24,o.add(a);const l=Me(new We(.42,1),s);l.position.y=-.78,o.add(l);for(let c=-1;c<=1;c++){const h=Me(new Ce(.065,.34,5),r);h.position.set(c*.15,-1.05,.15),h.rotation.x=1.1,o.add(h)}return o}_bossLeg(t,e,n,s){const r=new Gt;r.position.set(t,e,0);const o=Me(new Cn(.3,.75,5,8),n);o.position.y=-.3,r.add(o);const a=Me(new Ee(.65,.32,.9),s);return a.position.set(0,-.83,.17),r.add(a),r}get position(){return this.root.position}takeHit(t,e,n=!1){if(this.dead||this.state==="spawn")return!1;this.hp=Math.max(0,this.hp-t),this.hitFlash=.12;const s=this.position.clone().sub(e);return s.y=0,s.lengthSq()>.01&&!this.isBoss&&this.velocity.add(s.normalize().multiplyScalar(4.4)),this.fx.burst(this.position.clone().add(new Sa(0,this.isBoss?1.8:.8,0)),n?16760438:12119984,n?20:11,n?5.5:3.5,this.isBoss?1.25:.85),this.audio.hit(n),this.hp<=0?(this.dead=!0,this.state="dead",this.stateTime=0,this.stateDuration=this.isBoss?1.8:.85,this.fx.ring(this.position,this.isBoss?16756083:9034408,.3,this.isBoss?5.5:2.2,this.isBoss?1.1:.45)):this.isBoss||(this.state="stagger",this.stateTime=0,this.stateDuration=.2),!0}update(t,e){if(this.stateTime+=t,this.hitFlash=Math.max(0,this.hitFlash-t),this.attackEvent=!1,this.dead){const o=Xr(this.stateTime/this.stateDuration,0,1);this.root.scale.setScalar((this.isBoss?1.08:this.scaleBase)*(1-o*.72)),this.root.rotation.z=o*(this.isBoss?.65:1.15),this.root.position.y=-o*(this.isBoss?.3:.15),this.root.traverse(a=>{a.material&&"opacity"in a.material&&a.material.transparent&&(a.material.opacity=1-o)}),o>=1&&(this.remove=!0,this.scene.remove(this.root));return}const n=e.position.clone().sub(this.position);n.y=0;const s=n.length(),r=s>.001?n.multiplyScalar(1/s):new Sa;if(this.state==="spawn"){const o=Xr(this.stateTime/this.stateDuration,0,1),a=1-Math.pow(1-o,3);this.root.scale.setScalar((this.isBoss?1.08:this.scaleBase)*a),o>=1&&(this.state="idle",this.stateTime=0)}else this.state==="idle"?s<(this.isBoss?18:12)&&(this.state="chase",this.stateTime=0):this.state==="chase"?s<this.attackRange?(this.state="windup",this.stateTime=0,this.stateDuration=this.isBoss?.92:.52,this.velocity.multiplyScalar(.35)):(this.velocity.x=Zn(this.velocity.x,r.x*this.speed,8,t),this.velocity.z=Zn(this.velocity.z,r.z*this.speed,8,t)):this.state==="windup"?(this.velocity.multiplyScalar(Math.exp(-t*9)),this.stateTime>this.stateDuration&&(this.state="attack",this.stateTime=0,this.stateDuration=this.isBoss?.5:.24,this.attackEvent=!0,this.attackSerial++,this.isBoss&&this.fx.ring(this.position,16742495,.25,4.6,.55))):this.state==="attack"?(this.stateTime<this.stateDuration*.48?(this.velocity.x=r.x*(this.isBoss?3.7:5.4),this.velocity.z=r.z*(this.isBoss?3.7:5.4)):this.velocity.multiplyScalar(Math.exp(-t*12)),this.stateTime>this.stateDuration&&(this.state="recover",this.stateTime=0,this.stateDuration=this.isBoss?.72:.46)):this.state==="recover"?(this.velocity.multiplyScalar(Math.exp(-t*10)),this.stateTime>this.stateDuration&&(this.state="chase",this.stateTime=0)):this.state==="stagger"&&(this.velocity.multiplyScalar(Math.exp(-t*8)),this.stateTime>this.stateDuration&&(this.state="chase",this.stateTime=0));if(!["windup","stagger"].includes(this.state)&&r.lengthSq()>.01){let a=(Math.atan2(r.x,r.z)-this.facing+Math.PI)%(Math.PI*2)-Math.PI;this.facing+=a*(1-Math.exp(-t*8))}this.position.addScaledVector(this.velocity,t),this.root.rotation.y=this.facing,this._animate(t,s)}_animate(t,e){const n=this.rig,s=performance.now()*.001,r=Math.sin(s*(this.isBoss?4.3:7));if(!n)return;const o=this.state==="chase"&&e>this.attackRange;if(n.body.position.y=(this.isBoss?1.45:.67)+(o?Math.abs(Math.sin(s*(this.isBoss?4.4:7.3)))*(this.isBoss?.08:.055):0),n.head.rotation.z=Math.sin(s*2.3)*.025,n.armL.rotation.x=Zn(n.armL.rotation.x,o?r*.38:0,8,t),n.armR.rotation.x=Zn(n.armR.rotation.x,o?-r*.38:0,8,t),n.legL.rotation.x=Zn(n.legL.rotation.x,o?-r*.35:0,8,t),n.legR.rotation.x=Zn(n.legR.rotation.x,o?r*.35:0,8,t),this.state==="windup"){const l=Xr(this.stateTime/this.stateDuration,0,1);n.body.rotation.x=.22*l,n.armL.rotation.x=-1.25*l,n.armR.rotation.x=-1.25*l;const c=1+Math.sin(s*28)*.018*l;this.root.scale.x=(this.isBoss?1.08:this.scaleBase)*c,this.root.scale.z=(this.isBoss?1.08:this.scaleBase)*c}else if(this.state==="attack"){const l=this.stateTime/this.stateDuration;n.body.rotation.x=-.36*Math.sin(Math.PI*l),n.armL.rotation.x=-1.25+2.1*Math.sin(Math.PI*l),n.armR.rotation.x=-1.25+2.1*Math.sin(Math.PI*l)}else n.body.rotation.x=Zn(n.body.rotation.x,0,9,t);this.state==="stagger"?n.body.rotation.z=Math.sin(this.stateTime*24)*.18:n.body.rotation.z=Zn(n.body.rotation.z,0,10,t);const a=this.hitFlash>0?1.3:0;for(const l of this.materials||[])l.emissive&&(this.hitFlash>0?(l.emissive.setHex(16777215),l.emissiveIntensity=a):(l.emissive.setHex(l.userData.baseEmissive||0),l.emissiveIntensity=l.userData.baseEI||0));if(this.state==="windup"){const l=Xr(this.stateTime/this.stateDuration,0,1);this.telegraph.material.opacity=.18+.58*l,this.telegraph.scale.setScalar(.85+.18*Math.sin(this.stateTime*12)),this.telegraph.rotation.z+=t*(this.isBoss?1.1:1.8)}else this.telegraph.material.opacity=Zn(this.telegraph.material.opacity,0,18,t)}}const He=R,Ex=jt.clamp,ba=jt.damp;class _e{constructor(t){this.canvas=t,this.scene=new Sp,this.clock=new gd,this.quality=this._detectQuality(),this.renderer=this._makeRenderer(t),this.camera=new Ye(54,innerWidth/innerHeight,.08,500),this.camera.position.set(7,5.5,16),this.cameraYaw=Math.PI,this.cameraPitch=.28,this.cameraShake=0,this.cameraKick=0,this.fx=new bd(this.scene),this.audio=new wx,this.input=new bx(t),this.world=new Tx(this.scene,this.renderer,this.quality),this.player=new yn(this.scene,this.fx,this.audio),this.enemies=[],this.projectiles=[],this.pickups=[],this.kills=0,this.objectiveKills=8,this.boss=null,this.bossPending=!1,this.bossTimer=0,this.victoryTimer=0,this.victoryShown=!1,this.gameTime=0,this.started=!1,this.hitStop=0,this.attackCooldown=0,this.spellCooldown=0,this.dodgeCooldown=0,this.comboStep=0,this.comboDeadline=0,this.attackQueued=!1,this.combatCombo=0,this.combatComboTimer=0,this.respawnTimer=0,this.toastTimer=0,this._buildPost(),this._bindUI(),this._spawnInitialEnemies(),this._resize(),addEventListener("resize",()=>this._resize())}_detectQuality(){const t=matchMedia("(pointer: coarse)").matches,e=navigator.hardwareConcurrency||4,n=navigator.deviceMemory||8;return!t&&e>=6&&n>=4&&innerWidth>=800?"high":"low"}_makeRenderer(t){const e=new fx({canvas:t,antialias:!0,powerPreference:"high-performance",alpha:!1});return e.setPixelRatio(Math.min(devicePixelRatio,this.quality==="high"?1.8:1.15)),e.setSize(innerWidth,innerHeight,!1),e.shadowMap.enabled=!0,e.shadowMap.type=Ao,e.outputColorSpace=Re,e.toneMapping=Oc,e.toneMappingExposure=1.08,e}_buildPost(){if(this.quality!=="high")return;this.composer=new xx(this.renderer),this.composer.addPass(new Mx(this.scene,this.camera));const t=new As(new ut(innerWidth,innerHeight),.26,.48,.82);t.threshold=.72,t.strength=.28,t.radius=.38,this.composer.addPass(t),this.composer.addPass(new Sx)}_bindUI(){this.ui={hpFill:document.querySelector("#hp-fill"),hpText:document.querySelector("#hp-text"),manaFill:document.querySelector("#mana-fill"),xpFill:document.querySelector("#xp-fill"),level:document.querySelector("#level"),questCopy:document.querySelector("#quest-copy"),questProgress:document.querySelector("#quest-progress"),questFill:document.querySelector("#quest-fill"),bossUi:document.querySelector("#boss-ui"),bossFill:document.querySelector("#boss-fill"),combo:document.querySelector("#combo"),toast:document.querySelector("#toast"),damageLayer:document.querySelector("#damage-layer"),damageFlash:document.querySelector("#damage-flash"),intro:document.querySelector("#intro"),victory:document.querySelector("#victory")},document.querySelector("#enter-btn").addEventListener("click",()=>{this.audio.unlock(),this.started=!0,this.ui.intro.classList.add("hidden"),matchMedia("(pointer: coarse)").matches||this.canvas.requestPointerLock?.(),this.toast("Defeat the Briarbound")}),document.querySelector("#restart-btn").addEventListener("click",()=>location.reload())}_spawnInitialEnemies(){[[-5,3],[5,1],[-8,-7],[7,-8],[2,-4]].forEach(([e,n])=>this._spawnEnemy(e,n))}_spawnEnemy(t,e,n="briarling"){const s=new He(t??0,0,e??0);if(t==null){let o=0;do{const a=Math.random()*Math.PI*2,l=8+Math.random()*15;s.set(Math.cos(a)*l,0,Math.sin(a)*l),o++}while(s.distanceTo(this.player.position)<7&&o<20)}const r=new In(this.scene,this.fx,this.audio,s,n);return this.enemies.push(r),r}_spawnBoss(){this.bossPending=!1,this.world.unlockPortal(),this.boss=this._spawnEnemy(0,-13.8,"boss"),this.ui.bossUi.classList.remove("hidden"),this.ui.questCopy.textContent="Break Thornmaw, the oath-sworn guardian of the corrupted glade.",this.ui.questProgress.textContent="Ancient Warden awakened",this.ui.questFill.style.width="100%",this.toast("THORNMAW AWAKENS",2),this.audio.boss(),this.cameraShake=.95,this.fx.ring(this.boss.position,16747362,.4,6.8,1.2)}start(){this.renderer.setAnimationLoop(()=>this._frame())}_frame(){let t=Math.min(.033,this.clock.getDelta());const e=t;if(this.gameTime+=e,!this.started){this.world.update(e),this.fx.update(e),this._introCamera(e),this._render();return}this.hitStop>0&&(this.hitStop-=e,t*=.06),this.attackCooldown=Math.max(0,this.attackCooldown-e),this.spellCooldown=Math.max(0,this.spellCooldown-e),this.dodgeCooldown=Math.max(0,this.dodgeCooldown-e),this.comboDeadline-=e,this.combatComboTimer-=e,this.combatComboTimer<=0&&(this.combatCombo=0),this.toastTimer>0&&(this.toastTimer-=e,this.toastTimer<=0&&this.ui.toast.classList.remove("show"));const n=this.input.consumeLook();this.cameraYaw-=n.x*.00225,this.cameraPitch=Ex(this.cameraPitch-n.y*.00165,-.06,.68);const s=this.input.getMove(),r=this._moveVector(s);this._handleInput(r),this.player.update(t,s,this.cameraYaw),this.world.clampToArena(this.player.position),this.player.attackWindow()&&this._resolveMelee(),this._updateEnemies(t,e),this._updateProjectiles(t),this._updatePickups(t),this._updateEncounter(e),this.fx.update(t),this.world.update(t),this._updateCamera(e),this._updateHUD(),this.input.endFrame(),this._render()}_handleInput(t){this.input.consume("attack")&&(this.player.state==="attack"?this.player.stateTime/this.player.stateDuration>.48&&(this.attackQueued=!0):this.attackCooldown<=0&&!this.player.dead&&this._startAttack()),this.attackQueued&&this.player.state==="idle"&&this.attackCooldown<=0&&(this.attackQueued=!1,this._startAttack()),this.input.consume("dodge")&&this.dodgeCooldown<=0&&!this.player.dead&&this.player.beginDodge(t)&&(this.dodgeCooldown=.92,this.cameraKick=.75),this.input.consume("spell")&&this.spellCooldown<=0&&this.player.mana>=26&&!this.player.dead&&this.player.state!=="dodge"&&this._castSpell()}_startAttack(){this.comboDeadline<=0?this.comboStep=0:this.comboStep=(this.comboStep+1)%3,this.player.beginAttack(this.comboStep)&&(this.attackCooldown=[.22,.24,.35][this.comboStep],this.comboDeadline=.72)}_resolveMelee(){const t=this.player.comboIndex,e=new He(Math.sin(this.player.facing),0,Math.cos(this.player.facing)),n=this.player.position.clone(),s=[2.15,2.25,2.75][t],r=[.22,.15,-.15][t],o=[19,23,36][t];let a=0;this.fx.slash(n,this.player.facing,t);for(const l of this.enemies){if(l.dead)continue;const c=l.position.clone().sub(n);c.y=0;const h=c.length();if(h>s+l.radius||(h>.001?c.normalize().dot(e):1)<r)continue;const d=Math.random()<(t===2?.24:.12),f=Math.round(o*(d?1.72:1));l.takeHit(f,n,d)&&(a++,this._damageNumber(l.position.clone().add(new He(0,l.isBoss?2.8:1.45,0)),f,d),this._addCombatCombo())}a&&(this.hitStop=t===2?.078:.043,this.cameraShake=Math.max(this.cameraShake,t===2?.55:.27),this.cameraKick=Math.max(this.cameraKick,t===2?.5:.22),t===2&&this.fx.ring(n,16765309,.25,2,.22))}_castSpell(){this.player.mana-=26,this.spellCooldown=2.35,this.audio.spell();const t=new He(Math.sin(this.player.facing),0,Math.cos(this.player.facing)),e=this.player.position.clone().add(new He(0,1.1,0)).addScaledVector(t,.85),n=new $(new We(.22,1),new Ze({color:16758383,emissive:16735030,emissiveIntensity:3.4,roughness:.18,flatShading:!0}));n.position.copy(e),this.scene.add(n);const s=new ci(16741453,2.2,5,2);n.add(s),this.projectiles.push({mesh:n,velocity:t.multiplyScalar(13.5),life:1.45,hits:new Set,pierce:2}),this.fx.ring(this.player.position,16752736,.2,1.4,.28),this.cameraKick=.35}_updateProjectiles(t){for(let e=this.projectiles.length-1;e>=0;e--){const n=this.projectiles[e];n.life-=t,n.mesh.position.addScaledVector(n.velocity,t),n.mesh.rotation.x+=t*8,n.mesh.rotation.y+=t*11,this.fx.projectileTrail(n.mesh.position);let s=!1;for(const r of this.enemies){if(r.dead||n.hits.has(r))continue;const o=r.radius+.45;if(n.mesh.position.distanceTo(r.position.clone().add(new He(0,r.isBoss?1.6:.75,0)))<o){n.hits.add(r),n.pierce--;const a=Math.random()<.16,l=Math.round(42*(a?1.55:1));if(r.takeHit(l,this.player.position,a),this._damageNumber(r.position.clone().add(new He(0,r.isBoss?2.8:1.45,0)),l,a),this._addCombatCombo(),this.fx.burst(n.mesh.position,16747093,24,5.5,1),this.fx.ring(r.position,16744788,.18,2.2,.3),this.cameraShake=Math.max(this.cameraShake,.38),this.hitStop=.055,n.pierce<=0){s=!0;break}}}(n.life<=0||s)&&(this.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.projectiles.splice(e,1))}}_updateEnemies(t,e){for(const n of this.enemies){if(n.update(t,this.player),this.world.clampToArena(n.position),n.attackEvent&&!this.player.dead){const s=n.position.distanceTo(this.player.position),r=n.isBoss?4.35:1.75;s<r&&this.player.takeDamage(n.damage,n.position)&&(this.ui.damageFlash.classList.add("hit"),setTimeout(()=>this.ui.damageFlash.classList.remove("hit"),55),this.cameraShake=Math.max(this.cameraShake,n.isBoss?.78:.42),this.hitStop=n.isBoss?.055:.035)}n.dead&&!n.userDataRewarded&&(n.userDataRewarded=!0,n.isBoss?(this.victoryTimer=1.65,this.ui.bossFill.style.transform="scaleX(0)",this.toast("ANCIENT WARDEN DEFEATED",1.5),this.cameraShake=.8,this.fx.levelUp(n.position)):(this.kills++,this._spawnEssence(n.position,n.reward),this._updateQuest(),this.kills>=this.objectiveKills&&!this.boss&&!this.bossPending&&(this.bossPending=!0,this.bossTimer=1.8,this.toast("The forest is answering…",1.6))))}for(let n=0;n<this.enemies.length;n++)for(let s=n+1;s<this.enemies.length;s++){const r=this.enemies[n],o=this.enemies[s];if(r.dead||o.dead)continue;const a=r.position.clone().sub(o.position);a.y=0;const l=a.length(),c=r.radius+o.radius+.25;l>0&&l<c&&(a.multiplyScalar((c-l)/l*.035),r.position.add(a),o.position.sub(a))}this.enemies=this.enemies.filter(n=>!n.remove),this.player.dead&&(this.respawnTimer+=e,this.respawnTimer>1.6&&(this.player.dead=!1,this.player.hp=this.player.maxHp,this.player.mana=this.player.maxMana,this.player.state="idle",this.player.stateTime=0,this.player.root.rotation.set(0,this.player.facing,0),this.player.rig.body.rotation.set(0,0,0),this.player.rig.head.rotation.set(0,0,0),this.player.setPosition(0,0,9),this.respawnTimer=0,this.toast("The grove restores you",1.2),this.fx.levelUp(this.player.position)))}_updateEncounter(t){if(this.kills<this.objectiveKills&&!this.bossPending){const e=this.enemies.filter(s=>!s.dead&&!s.isBoss).length,n=this.kills+e;e<4&&n<this.objectiveKills?this._spawnEnemy():e<4&&this.kills<this.objectiveKills&&this._spawnEnemy()}this.bossPending&&(this.bossTimer-=t,this.bossTimer<=0&&this._spawnBoss()),this.boss&&!this.boss.dead&&(this.ui.bossFill.style.transform=`scaleX(${this.boss.hp/this.boss.maxHp})`),this.victoryTimer>0&&(this.victoryTimer-=t,this.victoryTimer<=0&&!this.victoryShown&&(this.victoryShown=!0,this.ui.victory.classList.remove("hidden"),document.exitPointerLock?.()))}_spawnEssence(t,e){for(let s=0;s<3;s++){const r=s===0?16765819:8448455,o=new $(new dr(.11,0),new Ze({color:r,emissive:r,emissiveIntensity:2,roughness:.25,flatShading:!0}));o.position.copy(t).add(new He((Math.random()-.5)*.8,.45+Math.random()*.5,(Math.random()-.5)*.8)),this.scene.add(o),this.pickups.push({mesh:o,value:e/3,age:0,phase:Math.random()*6.28})}}_updatePickups(t){for(let e=this.pickups.length-1;e>=0;e--){const n=this.pickups[e];n.age+=t,n.mesh.rotation.y+=t*5,n.mesh.position.y+=Math.sin(n.age*4+n.phase)*t*.12;const s=this.player.position.clone().add(new He(0,.8,0)).sub(n.mesh.position),r=s.length();if(n.age>.35&&r<6&&n.mesh.position.addScaledVector(s.normalize(),t*(4+Math.max(0,6-r)*2.4)),r<.55){const o=this.player.addXp(n.value);this.player.hp=Math.min(this.player.maxHp,this.player.hp+1.8),this.player.mana=Math.min(this.player.maxMana,this.player.mana+2.5),this.audio.pickup(),o&&this.toast(`LEVEL ${this.player.level}`,1.4),this.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.pickups.splice(e,1)}}}_moveVector(t){const e=new He(Math.sin(this.cameraYaw),0,Math.cos(this.cameraYaw)),n=new He(Math.cos(this.cameraYaw),0,-Math.sin(this.cameraYaw));return e.multiplyScalar(t.y).add(n.multiplyScalar(t.x))}_addCombatCombo(){this.combatCombo++,this.combatComboTimer=1.55,this.ui.combo.querySelector("strong").textContent=this.combatCombo,this.ui.combo.classList.toggle("hidden",this.combatCombo<2)}_updateQuest(){const t=Math.min(this.kills,this.objectiveKills);this.ui.questProgress.textContent=`${t} / ${this.objectiveKills} defeated`,this.ui.questFill.style.width=`${t/this.objectiveKills*100}%`,t===this.objectiveKills&&(this.ui.questCopy.textContent="The glade falls silent. Something ancient stirs beyond the shrine…")}_damageNumber(t,e,n){const s=t.clone().project(this.camera);if(s.z>1)return;const r=document.createElement("div");r.className=`damage-number${n?" crit":""}`,r.textContent=n?`${e}!`:e,r.style.left=`${(s.x*.5+.5)*innerWidth}px`,r.style.top=`${(-s.y*.5+.5)*innerHeight}px`,this.ui.damageLayer.appendChild(r),setTimeout(()=>r.remove(),720)}toast(t,e=1.1){this.ui.toast.textContent=t,this.ui.toast.classList.add("show"),this.toastTimer=e}_updateHUD(){const t=this.player;this.ui.hpFill.style.transform=`scaleX(${t.hp/t.maxHp})`,this.ui.hpText.textContent=`${Math.ceil(t.hp)} / ${t.maxHp}`,this.ui.manaFill.style.transform=`scaleX(${t.mana/t.maxMana})`,this.ui.xpFill.style.transform=`scaleX(${t.xp/t.xpToLevel})`,this.ui.level.textContent=`Lv. ${t.level}`,this.ui.combo.classList.toggle("hidden",this.combatCombo<2||this.combatComboTimer<=0)}_updateCamera(t){const e=this.player.position,n=new He(Math.sin(this.cameraYaw),0,Math.cos(this.cameraYaw)),s=6.8,r=e.clone().add(new He(0,1.25,0)).addScaledVector(n,.55),o=Math.cos(this.cameraPitch),a=Math.sin(this.cameraPitch),l=new He(-Math.sin(this.cameraYaw)*s*o,3.1+s*a*.72,-Math.cos(this.cameraYaw)*s*o),c=r.clone().add(l),h=1-Math.exp(-t*9.5);if(this.camera.position.lerp(c,h),this.cameraShake=ba(this.cameraShake,0,7,t),this.cameraKick=ba(this.cameraKick,0,6,t),this.cameraShake>.01){const f=this.cameraShake*this.cameraShake;this.camera.position.x+=(Math.random()-.5)*f*.28,this.camera.position.y+=(Math.random()-.5)*f*.21,this.camera.position.z+=(Math.random()-.5)*f*.28}const u=r.clone().addScaledVector(n,this.cameraKick*.5);this.camera.lookAt(u);const d=54+this.player.speed/5.2*2.2+this.cameraKick*2.8;this.camera.fov=ba(this.camera.fov,d,7,t),this.camera.updateProjectionMatrix()}_introCamera(t){const e=this.gameTime*.17,n=new He(0,1.3,1.5),s=13.5,r=new He(Math.sin(e)*s,5.2+Math.sin(e*.7)*.7,Math.cos(e)*s+1.5);this.camera.position.lerp(r,1-Math.exp(-t*1.4)),this.camera.lookAt(n)}_resize(){const t=innerWidth,e=innerHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(devicePixelRatio,this.quality==="high"?1.8:1.15)),this.renderer.setSize(t,e,!1),this.composer?.setSize(t,e)}_render(){this.composer?this.composer.render():this.renderer.render(this.scene,this.camera)}}const ps=R,Ax=jt.clamp,wa=jt.damp,wd=()=>new URLSearchParams(location.search),Td=()=>wd().has("capture"),Rx=new dn(1.05,.055,7,42,Math.PI*.98),Cx=new dn(1.06,.14,7,42,Math.PI*.98),Px=new dn(1.03,.026,6,42,Math.PI*.98),Ix=_e.prototype._detectQuality;_e.prototype._detectQuality=function(){const i=wd().get("quality");return i==="high"||i==="low"?i:Ix.call(this)};const Lx=_e.prototype._makeRenderer;_e.prototype._makeRenderer=function(i){const t=Lx.call(this,i);return Td()&&t.setPixelRatio(1),t.toneMappingExposure=.96,t};const Dx=_e.prototype._resize;_e.prototype._resize=function(){Dx.call(this),Td()&&(this.renderer.setPixelRatio(1),this.renderer.setSize(innerWidth,innerHeight,!1),this.composer?.setPixelRatio?.(1),this.composer?.setSize(innerWidth,innerHeight))};_e.prototype._faceNearestTarget=function(i=5,t=-.15){const e=this.player.position,n=new ps(Math.sin(this.player.facing),0,Math.cos(this.player.facing));let s=null,r=1/0;for(const o of this.enemies){if(o.dead)continue;const a=o.position.clone().sub(e);a.y=0;const l=a.length();if(l<.001||l>i)continue;const c=a.clone().normalize().dot(n);if(c<t)continue;const h=l*(1+(1-c)*.35);h<r&&(s=o,r=h)}if(s){const o=s.position.clone().sub(e);o.y=0,this.player.facing=Math.atan2(o.x,o.z),this.player.root.rotation.y=this.player.facing}return s};const Nx=_e.prototype._startAttack;_e.prototype._startAttack=function(){return this._faceNearestTarget(4.6,.05),Nx.call(this)};const Ux=_e.prototype._resolveMelee;_e.prototype._resolveMelee=function(){Ux.call(this);const i=new ps(Math.sin(this.player.facing),0,Math.cos(this.player.facing));this.player.velocity.addScaledVector(i,this.player.comboIndex===2?1.35:.72)};yn.prototype.beginCast=function(){return this.dead||this.state==="dodge"?!1:(this.state="cast",this.stateTime=0,this.stateDuration=.34,this.velocity.multiplyScalar(.55),!0)};const Fx=yn.prototype.update;yn.prototype.update=function(i,t,e){Fx.call(this,i,t,e),this.state==="cast"&&this.stateTime>=this.stateDuration&&(this.state="idle",this.stateTime=0)};const Ox=yn.prototype._animate;yn.prototype._animate=function(i){if(Ox.call(this,i),this.state!=="cast")return;const t=this.rig,e=Ax(this.stateTime/this.stateDuration,0,1),n=Math.sin(Math.PI*e);t.body.rotation.y=-.16*n,t.armL.rotation.x=-1.25*n,t.armL.rotation.z=.62*n,t.armR.rotation.x=-.72*n,t.swordGlow.material.emissiveIntensity=2.2+2.2*n};const Bx=_e.prototype._castSpell;_e.prototype._castSpell=function(){this._faceNearestTarget(13,-.4),this.player.beginCast?.(),Bx.call(this);const i=this.projectiles.at(-1);if(!i||i.mesh.userData.showcaseEnhanced)return;i.mesh.userData.showcaseEnhanced=!0;const t=new $(new Fe(.38,10,8),new Nt({color:16740165,transparent:!0,opacity:.24,depthWrite:!1,blending:se})),e=new Nt({color:16767379,transparent:!0,opacity:.82,depthWrite:!1,blending:se}),n=new $(new dn(.34,.035,6,20),e),s=n.clone();n.rotation.x=Math.PI/2,s.rotation.y=Math.PI/2,i.mesh.add(t,n,s),i.mesh.material.emissiveIntensity=4.1,i.mesh.scale.setScalar(1.12)};bd.prototype.slash=function(i,t,e=0){const n=[12189667,9434577,16764018],s=[15728630,14286834,16773557],r=new Gt,o=(h,u,d)=>{const f=new $(h,new Nt({color:u,transparent:!0,opacity:d,side:fe,depthWrite:!1,blending:se}));return f.userData.disposeMaterial=!0,f},a=o(Cx,n[e%3],.22),l=o(Rx,n[e%3],1),c=o(Px,s[e%3],.95);r.add(a,l,c),r.position.copy(i).add(new ps(0,1.12,0)),r.rotation.set(Math.PI/2.42,t-Math.PI*.48,e===2?-.72:.22),r.scale.setScalar(e===2?1.38:1.08),this.add(r,.21,(h,u,d)=>{h.obj.scale.multiplyScalar(1+u*(e===2?5.2:4.2));const f=Math.pow(1-d,1.4);h.obj.children[0].material.opacity=f*.22,h.obj.children[1].material.opacity=f,h.obj.children[2].material.opacity=f*.92,h.obj.rotation.z+=(e===2?.9:.45)*u})};const zh=In.prototype.update;In.prototype.update=function(i,t){if(!this.isBoss)return zh.call(this,i,t);const e=1.36/1.08;this.root.scale.multiplyScalar(1/e);const n=zh.call(this,i,t);return this.root.scale.multiplyScalar(e),n};const kx=_e.prototype._spawnBoss;_e.prototype._spawnBoss=function(){kx.call(this),this.boss&&(this.boss.maxHp=760,this.boss.hp=760,this.boss.radius=1.38,this.boss.attackRange=2.85,this.boss.damage=24)};_e.prototype._updateCamera=function(i){const t=this.player.position,e=new ps(Math.sin(this.cameraYaw),0,Math.cos(this.cameraYaw)),n=6.05,s=t.clone().add(new ps(0,1.35,0)).addScaledVector(e,.62),r=Math.cos(this.cameraPitch),o=Math.sin(this.cameraPitch),a=new ps(-Math.sin(this.cameraYaw)*n*r,2.45+n*o*.58,-Math.cos(this.cameraYaw)*n*r),l=s.clone().add(a);if(this.camera.position.lerp(l,1-Math.exp(-i*9.5)),this.cameraShake=wa(this.cameraShake,0,7,i),this.cameraKick=wa(this.cameraKick,0,6,i),this.cameraShake>.01){const h=this.cameraShake*this.cameraShake;this.camera.position.x+=(Math.random()-.5)*h*.28,this.camera.position.y+=(Math.random()-.5)*h*.21,this.camera.position.z+=(Math.random()-.5)*h*.28}this.camera.lookAt(s.clone().addScaledVector(e,this.cameraKick*.5));const c=50.5+this.player.speed/5.2*2.6+this.cameraKick*3.1;this.camera.fov=wa(this.camera.fov,c,7,i),this.camera.updateProjectionMatrix()};function zx(i){return()=>{let t=i+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Hx(i){i.cameraPitch=.16,i.renderer.toneMappingExposure=.96,i.scene.fog?.isFogExp2&&(i.scene.fog.color.setHex(6851456),i.scene.fog.density=.0175),i.scene.background?.setHex?.(6588285);let t=!1;i.scene.traverse(c=>{const h=c.material?.uniforms;h?.turbidity&&h?.rayleigh&&(h.turbidity.value=7.2,h.rayleigh.value=2.15,h.mieCoefficient.value=.0045,h.mieDirectionalG.value=.82),c.isHemisphereLight&&(c.intensity=1.28,c.color.setHex(12575445),c.groundColor.setHex(2241835)),c.isDirectionalLight&&!t?(c.intensity=3.35,c.color.setHex(16768424),t=!0):c.isDirectionalLight&&(c.intensity=.58,c.color.setHex(7065541))});const e=i.world.decor.children[0],n=i.world.decor.children[1];e?.material?.color?.setHex?.(3562054),n?.material?.color?.setHex?.(5207123);const s=new Gt;s.name="showcase-grass-patches";const r=[4549455,5995861,4155214,5403991],o=zx(15250420),a=r.map(c=>new Ze({color:c,roughness:1,flatShading:!0})),l=i.quality==="high"?22:13;for(let c=0;c<l;c++){const h=o()*Math.PI*2,u=2.5+o()*18.2,d=new $(new bi(1.15+o()*2,7),a[c%a.length]);d.rotation.x=-Math.PI/2,d.rotation.z=o()*Math.PI,d.scale.set(1,.65+o()*.8,1),d.position.set(Math.cos(h)*u,.013,Math.sin(h)*u),d.receiveShadow=!0,s.add(d)}if(i.world.decor.add(s),i.composer)for(const c of i.composer.passes)"strength"in c&&"threshold"in c&&(c.strength=.36,c.threshold=.68,c.radius=.42)}function Hh(i,t){if(t===Sf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(t===Mc||t===Ku){let e=i.getIndex();if(e===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);i.setIndex(o),e=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=e.count-2,s=[];if(t===Mc)for(let o=1;o<=n;o++)s.push(e.getX(0)),s.push(e.getX(o)),s.push(e.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(e.getX(o)),s.push(e.getX(o+1)),s.push(e.getX(o+2))):(s.push(e.getX(o+2)),s.push(e.getX(o+1)),s.push(e.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),i}class ll extends Is{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new qx(e)}),this.register(function(e){return new Kx(e)}),this.register(function(e){return new nM(e)}),this.register(function(e){return new iM(e)}),this.register(function(e){return new sM(e)}),this.register(function(e){return new jx(e)}),this.register(function(e){return new $x(e)}),this.register(function(e){return new Jx(e)}),this.register(function(e){return new Zx(e)}),this.register(function(e){return new Xx(e)}),this.register(function(e){return new Qx(e)}),this.register(function(e){return new Yx(e)}),this.register(function(e){return new eM(e)}),this.register(function(e){return new tM(e)}),this.register(function(e){return new Gx(e)}),this.register(function(e){return new rM(e)}),this.register(function(e){return new oM(e)})}load(t,e,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=er.extractUrlBase(t);o=er.resolveURL(c,this.path)}else o=er.extractUrlBase(t);this.manager.itemStart(t);const a=function(c){s?s(c):console.error(c),r.manager.itemError(t),r.manager.itemEnd(t)},l=new md(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(t,function(c){try{r.parse(c,o,function(h){e(h),r.manager.itemEnd(t)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,s){let r;const o={},a={},l=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(l.decode(new Uint8Array(t,0,4))===Ed){try{o[Xt.KHR_BINARY_GLTF]=new aM(t)}catch(u){s&&s(u);return}r=JSON.parse(o[Xt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new MM(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case Xt.KHR_MATERIALS_UNLIT:o[u]=new Wx;break;case Xt.KHR_DRACO_MESH_COMPRESSION:o[u]=new cM(r,this.dracoLoader);break;case Xt.KHR_TEXTURE_TRANSFORM:o[u]=new lM;break;case Xt.KHR_MESH_QUANTIZATION:o[u]=new hM;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,s)}parseAsync(t,e){const n=this;return new Promise(function(s,r){n.parse(t,e,s,r)})}}function Vx(){let i={};return{get:function(t){return i[t]},add:function(t,e){i[t]=e},remove:function(t){delete i[t]},removeAll:function(){i={}}}}const Xt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Gx{constructor(t){this.parser=t,this.name=Xt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,s=e.length;n<s;n++){const r=e[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let s=e.cache.get(n);if(s)return s;const r=e.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t];let c;const h=new yt(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Qe);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new So(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new ci(h),c.distance=u;break;case"spot":c=new dm(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),ti(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=e.createUniqueName(l.name||"light_"+t),s=Promise.resolve(c),e.cache.add(n,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,r=n.json.nodes[t],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(e.cache,a,l)})}}class Wx{constructor(){this.name=Xt.KHR_MATERIALS_UNLIT}getMaterialType(){return Nt}extendParams(t,e,n){const s=[];t.color=new yt(1,1,1),t.opacity=1;const r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],Qe),t.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(t,"map",r.baseColorTexture,Re))}return Promise.all(s)}}class Xx{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(e.emissiveIntensity=r),Promise.resolve()}}class qx{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(e.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(e,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new ut(a,a)}return Promise.all(r)}}class Kx{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_DISPERSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return e.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Yx{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(e.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(e.iridescenceIOR=o.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class jx{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_SHEEN}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];e.sheenColor=new yt(0,0,0),e.sheenRoughness=0,e.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;e.sheenColor.setRGB(a[0],a[1],a[2],Qe)}return o.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(e,"sheenColorMap",o.sheenColorTexture,Re)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class $x{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(e.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(e,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class Jx{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_VOLUME}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];e.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(e,"thicknessMap",o.thicknessTexture)),e.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return e.attenuationColor=new yt().setRGB(a[0],a[1],a[2],Qe),Promise.all(r)}}class Zx{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_IOR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(t,e){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return e.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Qx{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_SPECULAR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];e.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(e,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return e.specularColor=new yt().setRGB(a[0],a[1],a[2],Qe),o.specularColorTexture!==void 0&&r.push(n.assignTexture(e,"specularColorMap",o.specularColorTexture,Re)),Promise.all(r)}}class tM{constructor(t){this.parser=t,this.name=Xt.EXT_MATERIALS_BUMP}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return e.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(e,"bumpMap",o.bumpTexture)),Promise.all(r)}}class eM{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Wn}extendMaterialParams(t,e){const n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(e.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(e.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(e,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class nM{constructor(t){this.parser=t,this.name=Xt.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,s=n.textures[t];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,o)}}class iM{constructor(t){this.parser=t,this.name=Xt.EXT_TEXTURE_WEBP}loadTexture(t){const e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=s.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(t,o.source,l)}}class sM{constructor(t){this.parser=t,this.name=Xt.EXT_TEXTURE_AVIF}loadTexture(t){const e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=s.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(t,o.source,l)}}class rM{constructor(t){this.name=Xt.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}}class oM{constructor(t){this.name=Xt.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=e.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==_n.TRIANGLES&&c.mode!==_n.TRIANGLE_STRIP&&c.mode!==_n.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const m of u){const _=new Rt,g=new R,p=new un,v=new R(1,1,1),M=new tl(m.geometry,m.material,d);for(let x=0;x<d;x++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,x),l.SCALE&&v.fromBufferAttribute(l.SCALE,x),M.setMatrixAt(x,_.compose(g,p,v));for(const x in l)if(x==="_COLOR_0"){const T=l[x];M.instanceColor=new Sc(T.array,T.itemSize,T.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&m.geometry.setAttribute(x,l[x]);pe.prototype.copy.call(M,m),this.parser.assignFinalMaterial(M),f.push(M)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Ed="glTF",Ws=12,Vh={JSON:1313821514,BIN:5130562};class aM{constructor(t){this.name=Xt.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,Ws),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Ed)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Ws,r=new DataView(t,Ws);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===Vh.JSON){const c=new Uint8Array(t,Ws+o,a);this.content=n.decode(c)}else if(l===Vh.BIN){const c=Ws+o;this.body=t.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class cM{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Xt.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=Ac[h]||h.toLowerCase();a[u]=o[h]}for(const h in t.attributes){const u=Ac[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[t.attributes[h]],f=ms[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return e.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(const m in f.attributes){const _=f.attributes[m],g=l[m];g!==void 0&&(_.normalized=g)}u(f)},a,c,Qe,d)})})}}class lM{constructor(){this.name=Xt.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}}class hM{constructor(){this.name=Xt.KHR_MESH_QUANTIZATION}}class Ad extends fr{constructor(t,e,n,s){super(t,e,n,s)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let o=0;o!==s;o++)e[o]=n[r+o];return e}interpolate_(t,e,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=s-e,u=(n-e)/h,d=u*u,f=d*u,m=t*c,_=m-c,g=-2*f+3*d,p=f-d,v=1-g,M=p-d+u;for(let x=0;x!==a;x++){const T=o[_+x+a],E=o[_+x+l]*h,C=o[m+x+a],I=o[m+x]*h;r[x]=v*T+M*E+g*C+p*I}return r}}const uM=new un;class dM extends Ad{interpolate_(t,e,n,s){const r=super.interpolate_(t,e,n,s);return uM.fromArray(r).normalize().toArray(r),r}}const _n={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ms={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Gh={9728:$e,9729:rn,9984:ku,9985:so,9986:js,9987:kn},Wh={33071:Mi,33648:mo,10497:Hi},Ta={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ac={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},vi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},fM={CUBICSPLINE:void 0,LINEAR:cr,STEP:ar},Ea={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function pM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Ze({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:oi})),i.DefaultMaterial}function Di(i,t,e){for(const n in e.extensions)i[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function ti(i,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(i.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function mM(i,t,e){let n=!1,s=!1,r=!1;for(let c=0,h=t.length;c<h;c++){const u=t[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],l=[];for(let c=0,h=t.length;c<h;c++){const u=t[c];if(n){const d=u.POSITION!==void 0?e.getDependency("accessor",u.POSITION):i.attributes.position;o.push(d)}if(s){const d=u.NORMAL!==void 0?e.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?e.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function gM(i,t){if(i.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)i.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(i.morphTargetInfluences.length===e.length){i.morphTargetDictionary={};for(let n=0,s=e.length;n<s;n++)i.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function _M(i){let t;const e=i.extensions&&i.extensions[Xt.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+Aa(e.attributes):t=i.indices+":"+Aa(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)t+=":"+Aa(i.targets[n]);return t}function Aa(i){let t="";const e=Object.keys(i).sort();for(let n=0,s=e.length;n<s;n++)t+=e[n]+":"+i[e[n]]+";";return t}function Rc(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function vM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const xM=new Rt;class MM{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new Vx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new lm(this.options.manager):this.textureLoader=new mm(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new md(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Di(r,a,s),ti(a,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){const o=e[s].joints;for(let a=0,l=o.length;a<l;a++)t[o[a]].isBone=!0}for(let s=0,r=t.length;s<r;s++){const o=t[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const s=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(n,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const s=t(e[n]);if(s)return s}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let s=0;s<e.length;s++){const r=t(e[s]);r&&n.push(r)}return n}getDependency(t,e){const n=t+":"+e;let s=this.cache.get(n);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(n,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,o){return n.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[Xt.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(er.resolveURL(e.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const s=e.byteLength||0,r=e.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(t){const e=this,n=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){const o=Ta[s.type],a=ms[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new Je(c,o,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=Ta[s.type],c=ms[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0;let _,g;if(f&&f!==u){const p=Math.floor(d/f),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let M=e.cache.get(v);M||(_=new c(a,p*f,s.count*f/h),M=new bp(_,f/h),e.cache.add(v,M)),g=new Zc(M,l,d%f/h,m)}else a===null?_=new c(s.count*l):_=new c(a,d,s.count*l),g=new Je(_,l,m);if(s.sparse!==void 0){const p=Ta.SCALAR,v=ms[s.sparse.indices.componentType],M=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,T=new v(o[1],M,s.sparse.count*p),E=new c(o[2],x,s.sparse.count*l);a!==null&&(g=new Je(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let C=0,I=T.length;C<I;C++){const S=T[C];if(g.setX(S,E[C*l]),l>=2&&g.setY(S,E[C*l+1]),l>=3&&g.setZ(S,E[C*l+2]),l>=4&&g.setW(S,E[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(t){const e=this.json,n=this.options,r=e.textures[t].source,o=e.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(t,r,a)}loadTextureImage(t,e,n){const s=this,r=this.json,o=r.textures[t],a=r.images[e],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(e,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=Gh[d.magFilter]||rn,h.minFilter=Gh[d.minFilter]||kn,h.wrapS=Wh[d.wrapS]||Hi,h.wrapT=Wh[d.wrapT]||Hi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==$e&&h.minFilter!==rn,s.associations.set(h,{textures:t}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(t,e){const n=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());const o=s.images[t],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let m=d;e.isImageBitmapLoader===!0&&(m=function(_){const g=new Pe(_);g.needsUpdate=!0,d(g)}),e.load(er.resolveURL(u,r.path),m,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),ti(u,o),u.userData.mimeType=o.mimeType||vM(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[t]=h,h}assignTexture(t,e,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Xt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Xt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[Xt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),t[e]=o,o})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new ad,Hn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(t.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new od,Hn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}t.material=n}getMaterialType(){return Ze}loadMaterial(t){const e=this,n=this.json,s=this.extensions,r=n.materials[t];let o;const a={},l=r.extensions||{},c=[];if(l[Xt.KHR_MATERIALS_UNLIT]){const u=s[Xt.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,e))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new yt(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Qe),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(e.assignTexture(a,"map",u.baseColorTexture,Re)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(e.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(e.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(t)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(t,a)})))}r.doubleSided===!0&&(a.side=fe);const h=r.alphaMode||Ea.OPAQUE;if(h===Ea.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Ea.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Nt&&(c.push(e.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ut(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Nt&&(c.push(e.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Nt){const u=r.emissiveFactor;a.emissive=new yt().setRGB(u[0],u[1],u[2],Qe)}return r.emissiveTexture!==void 0&&o!==Nt&&c.push(e.assignTexture(a,"emissiveMap",r.emissiveTexture,Re)),Promise.all(c).then(function(){const u=new o(a);return r.name&&(u.name=r.name),ti(u,r),e.associations.set(u,{materials:t}),r.extensions&&Di(s,u,r),u})}createUniqueName(t){const e=ee.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[Xt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(l){return Xh(l,a,e)})}const o=[];for(let a=0,l=t.length;a<l;a++){const c=t[a],h=_M(c),u=s[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[Xt.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Xh(new be,c,e),s[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(t){const e=this,n=this.json,s=this.extensions,r=n.meshes[t],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?pM(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(e.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,m=h.length;f<m;f++){const _=h[f],g=o[f];let p;const v=c[f];if(g.mode===_n.TRIANGLES||g.mode===_n.TRIANGLE_STRIP||g.mode===_n.TRIANGLE_FAN||g.mode===void 0)p=r.isSkinnedMesh===!0?new Tp(_,v):new $(_,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===_n.TRIANGLE_STRIP?p.geometry=Hh(p.geometry,Ku):g.mode===_n.TRIANGLE_FAN&&(p.geometry=Hh(p.geometry,Mc));else if(g.mode===_n.LINES)p=new Ip(_,v);else if(g.mode===_n.LINE_STRIP)p=new el(_,v);else if(g.mode===_n.LINE_LOOP)p=new Lp(_,v);else if(g.mode===_n.POINTS)p=new Dp(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&gM(p,r),p.name=e.createUniqueName(r.name||"mesh_"+t),ti(p,r),g.extensions&&Di(s,p,g),e.assignFinalMaterial(p),u.push(p)}for(let f=0,m=u.length;f<m;f++)e.associations.set(u[f],{meshes:t,primitives:f});if(u.length===1)return r.extensions&&Di(s,u[0],r),u[0];const d=new Gt;r.extensions&&Di(s,d,r),e.associations.set(d,{meshes:t});for(let f=0,m=u.length;f<m;f++)d.add(u[f]);return d})}loadCamera(t){let e;const n=this.json.cameras[t],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new Ye(jt.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(e=new Po(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),ti(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let s=0,r=e.joints.length;s<r;s++)n.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new Rt;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[c])}return new Qc(a,l)})}loadAnimation(t){const e=this.json,n=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const f=s.channels[u],m=s.samplers[f.sampler],_=f.target,g=_.node,p=s.parameters!==void 0?s.parameters[m.input]:m.input,v=s.parameters!==void 0?s.parameters[m.output]:m.output;_.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",v)),c.push(m),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],m=u[2],_=u[3],g=u[4],p=[];for(let v=0,M=d.length;v<M;v++){const x=d[v],T=f[v],E=m[v],C=_[v],I=g[v];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const S=n._createAnimationTracks(x,T,E,C,I);if(S)for(let b=0;b<S.length;b++)p.push(S[b])}return new wc(r,void 0,p)})}createNodeMesh(t){const e=this.json,n=this,s=e.nodes[t];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(t){const e=this.json,n=this,s=e.nodes[t],r=n._loadNodeShallow(t),o=[],a=s.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,xM)});for(let f=0,m=u.length;f<m;f++)h.add(u[f]);return h})}_loadNodeShallow(t){const e=this.json,n=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const r=e.nodes[t],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(t)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(t)}).forEach(function(c){a.push(c)}),this.nodeCache[t]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new sd:c.length>1?h=new Gt:c.length===1?h=c[0]:h=new pe,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),ti(h,r),r.extensions&&Di(n,h,r),r.matrix!==void 0){const u=new Rt;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=t,h}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],s=this,r=new Gt;n.name&&(r.name=s.createUniqueName(n.name)),ti(r,n),n.extensions&&Di(e,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of s.associations)(d instanceof Hn||d instanceof Pe)&&u.set(d,f);return h.traverse(d=>{const f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=c(r),r})}_createAnimationTracks(t,e,n,s,r){const o=[],a=t.name?t.name:t.uuid,l=[];vi[r.path]===vi.weights?t.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(vi[r.path]){case vi.weights:c=ws;break;case vi.rotation:c=Ts;break;case vi.translation:case vi.scale:c=Es;break;default:n.itemSize===1?c=ws:c=Es;break}const h=s.interpolation!==void 0?fM[s.interpolation]:cr,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const m=new c(l[d]+"."+vi[r.path],e.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),o.push(m)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=Rc(e.constructor),s=new Float32Array(e.length);for(let r=0,o=e.length;r<o;r++)s[r]=e[r]*n;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const s=this instanceof Ts?dM:Ad;return new s(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function yM(i,t,e){const n=t.attributes,s=new fn;if(n.POSITION!==void 0){const a=e.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new R(l[0],l[1],l[2]),new R(c[0],c[1],c[2])),a.normalized){const h=Rc(ms[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=t.targets;if(r!==void 0){const a=new R,l=new R;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=e.json.accessors[u.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const _=Rc(ms[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new Nn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Xh(i,t,e){const n=t.attributes,s=[];function r(o,a){return e.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(const o in n){const a=Ac[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(t.indices!==void 0&&!i.index){const o=e.getDependency("accessor",t.indices).then(function(a){i.setIndex(a)});s.push(o)}return Kt.workingColorSpace!==Qe&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Kt.workingColorSpace}" not supported.`),ti(i,t),yM(i,t,e),Promise.all(s).then(function(){return t.targets!==void 0?mM(i,t.targets,e):i})}function Rd(i){const t=new Map,e=new Map,n=i.clone();return Cd(i,n,function(s,r){t.set(r,s),e.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,o=t.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(l){return e.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Cd(i,t,e){e(i,t);for(let n=0;n<i.children.length;n++)Cd(i.children[n],t.children[n],e)}function sn(i){return`/maples2/${String(i).replace(/^\/+/,"")}`}const SM=new ll,qr=new Map,qh=R,ki={hero:sn("/assets/characters/rowan-knight.glb"),demon:sn("/assets/monsters/thornmaw-demon.glb"),ghost:sn("/assets/monsters/briar-ghost.glb"),skeleton:sn("/assets/monsters/briar-skeleton.glb"),bat:sn("/assets/monsters/briar-bat.glb")},bM={idle:["Idle"],run:["Running_A","Running_B"],walk:["Walking_A","Walking_B"],attack0:["1H_Melee_Attack_Slice_Horizontal"],attack1:["1H_Melee_Attack_Slice_Diagonal"],attack2:["1H_Melee_Attack_Chop"],dodge:["Dodge_Forward"],cast:["Spellcast_Shoot","Spellcasting"],hurt:["Hit_A","Hit_B"],death:["Death_A","Death_B"]},wM={skeleton:{idle:[/Skeleton_Idle$/i],run:[/Skeleton_Running$/i],windup:[/Skeleton_Attack$/i],attack:[/Skeleton_Attack$/i],hit:[/Skeleton_Idle$/i],death:[/Skeleton_Death$/i],spawn:[/Skeleton_Spawn$/i]},bat:{idle:[/Bat_Flying$/i],run:[/Bat_Flying$/i],windup:[/Bat_Attack2?$/i],attack:[/Bat_Attack2?$/i],hit:[/Bat_Hit$/i],death:[/Bat_Death$/i],spawn:[/Bat_Flying$/i]},ghost:{idle:["Flying_Idle"],run:["Fast_Flying"],windup:["Punch","Headbutt"],attack:["Punch","Headbutt"],hit:["HitReact"],death:["Death"],spawn:["Flying_Idle"]},demon:{idle:["Idle"],run:["Run","Walk"],windup:["Punch","Weapon"],attack:["Punch","Weapon"],hit:["HitReact"],death:["Death"],spawn:["Idle"]}};function hl(i){return qr.has(i)||qr.set(i,SM.loadAsync(i).catch(t=>{throw qr.delete(i),t})),qr.get(i)}function Pd(i,t=null,e=0,n=!1){i.traverse(s=>{if(!(!s.isMesh&&!s.isSkinnedMesh)&&(s.castShadow=!0,s.receiveShadow=!0,s.frustumCulled=!s.isSkinnedMesh,s.material)){const o=(Array.isArray(s.material)?s.material:[s.material]).map(a=>{const l=a.clone();return l.color&&t!=null&&e>0&&l.color.lerp(new yt(t),e),"roughness"in l&&(l.roughness=Math.max(.48,l.roughness??.7)),n&&(l.opacity=1,l.transparent=!1,l.depthWrite=!0,l.needsUpdate=!0),l});s.material=Array.isArray(s.material)?o:o[0]}})}function Id(i,t,e=0){i.updateMatrixWorld(!0);let n=new fn().setFromObject(i);const s=n.getSize(new qh);if(!Number.isFinite(s.y)||s.y<.001)return;i.scale.multiplyScalar(t/s.y),i.updateMatrixWorld(!0),n=new fn().setFromObject(i);const r=n.getCenter(new qh);i.position.x-=r.x,i.position.z-=r.z,i.position.y-=n.min.y,i.position.y+=e,i.updateMatrixWorld(!0)}function TM(i,t=[]){for(const e of t)if(e instanceof RegExp){const n=i.find(s=>e.test(s.name));if(n)return n}else{const n=i.find(r=>r.name===e);if(n)return n;const s=i.find(r=>r.name.toLowerCase().includes(String(e).toLowerCase()));if(s)return s}return null}class Ld{constructor(t,e,n){this.model=t,this.clips=e,this.map=n,this.mixer=new Cm(t),this.action=null,this.key=null,this.clip=null,this.clipCache=new Map}_clipFor(t){return this.clipCache.has(t)||this.clipCache.set(t,TM(this.clips,this.map[t]||[])),this.clipCache.get(t)}play(t,{once:e=!1,duration:n=null,fade:s=.12,startFraction:r=0}={}){if(this.key===t&&this.action)return this.action;const o=this._clipFor(t);if(!o)return null;const a=this.mixer.clipAction(o),l=this.action,c=this.clip,h=this.key,u=l&&c?.duration>0?l.time%c.duration/c.duration:0,d=!e&&["walk","run"].includes(t)&&["walk","run"].includes(h);return a===l&&h!==t&&a.stop(),a.enabled=!0,a.reset(),a.stopFading(),a.setEffectiveWeight(1),a.setEffectiveTimeScale(1),a.time=o.duration*jt.clamp(r,0,.92),d&&(a.time=o.duration*u),e?(a.setLoop(Xc,1),a.clampWhenFinished=!0):(a.setLoop(qc,1/0),a.clampWhenFinished=!1),n&&n>.02&&a.setDuration(n),l&&l!==a?(a.play(),a.crossFadeFrom(l,s,!0)):a.play(),this.action=a,this.key=t,this.clip=o,a}update(t,e=1){this.action&&!Number.isNaN(e)&&this.key&&["run","walk"].includes(this.key)&&this.action.setEffectiveTimeScale(jt.clamp(e,.68,1.5)),this.mixer.update(t)}get normalizedTime(){return!this.action||!this.clip?.duration?0:this.action.time%this.clip.duration/this.clip.duration}}function EM(i){for(const t of i.root.children)t===i.shadow||t.userData?.assetVisual||(t.visible=!1);i.shadow&&(i.shadow.visible=!0)}function AM(i){i.proceduralVisualFallback||=[];for(const t of[...i.root.children]){if(t===i.telegraph||t.userData?.assetVisual)continue;if(t.isMesh&&t.geometry?.type==="CircleGeometry"){t.visible=!0;continue}t.visible=!1,i.proceduralVisualFallback.push(t),i.root.remove(t)}i.telegraph.visible=!0}function RM(i){const t=new Set(["1H_Sword","Round_Shield","Knight_Helmet","Knight_Cape"]),e=new Set(["1H_Sword_Offhand","Badge_Shield","Rectangle_Shield","Round_Shield","Spike_Shield","1H_Sword","2H_Sword","Knight_Helmet","Knight_Cape"]);i.traverse(n=>{e.has(n.name)&&(n.visible=t.has(n.name))})}async function CM(i){try{const t=await hl(ki.hero);if(i.assetVisual)return;const e=Rd(t.scene);e.name="Rowan_Imported_Knight",e.userData.assetVisual=!0,Pd(e),RM(e),Id(e,1.83),e.rotation.y=0,i.root.add(e),i.assetVisual=e,i.assetAnimator=new Ld(e,t.animations,bM),i.assetAnimator.play("idle",{fade:0}),EM(i)}catch(t){console.error("Could not load Rowan GLB; keeping procedural fallback.",t)}}function PM(i,t){return t?{height:3.35,lift:0,tint:7030329,tintAmount:.18,rotation:0}:i==="ghost"?{height:1.5,lift:.28,tint:6274216,tintAmount:.18,rotation:0}:i==="bat"?{height:1.16,lift:.72,tint:5533535,tintAmount:.2,rotation:0}:{height:1.48,lift:0,tint:7245145,tintAmount:.2,rotation:0}}async function Kh(i,t){const e=i.isBoss?"demon":t;try{const n=await hl(ki[e]);if(i.assetVisual||i.remove)return;const s=Rd(n.scene),r=PM(e,i.isBoss);s.name=`${e}_Imported_Visual`,s.userData.assetVisual=!0,Pd(s,r.tint,r.tintAmount,!0),Id(s,r.height,r.lift),s.rotation.y=r.rotation,i.root.add(s),i.assetVisual=s,i.assetKind=e,i.assetAnimator=new Ld(s,n.animations,wM[e]),i.assetAnimator.play(i.state==="spawn"?"spawn":"idle",{fade:0,once:i.state==="spawn"}),AM(i)}catch(n){console.error(`Could not load ${e} GLB; keeping procedural fallback.`,n)}}function IM(i,t){const e=i.assetAnimator;if(!e)return;let n="idle",s=!1,r=null,o=.15;if(i.dead||i.state==="dead")n="death",s=!0,r=1.05,o=.07;else if(i.state==="attack")n=`attack${i.comboIndex}`,s=!0,r=i.stateDuration,o=.04;else if(i.state==="dodge")n="dodge",s=!0,r=i.stateDuration,o=.055;else if(i.state==="cast")n="cast",s=!0,r=i.stateDuration,o=.07;else if(i.state==="hurt")n="hurt",s=!0,r=i.stateDuration,o=.045;else if(i.speed>.5){const a=e.key==="run"?2.58:3.28;n=i.speed>a?"run":"walk",o=e.key==="idle"?.18:.14}e.play(n,{once:s,duration:r,fade:o}),e.update(t,i.speed/5.25)}function LM(i){return i.dead||i.state==="dead"?"death":i.state==="windup"?"windup":i.state==="attack"?"attack":i.state==="stagger"?"hit":i.state==="chase"?"run":i.state==="spawn"?"spawn":"idle"}function DM(i,t){const e=i.assetAnimator;if(!e)return;const n=LM(i),s=["windup","attack","hit","death","spawn"].includes(n);let r=null,o=0,a=.11;if(n==="windup"){const l=i.isBoss?.3:.36;r=i.stateDuration/l,a=i.isBoss?.12:.07}else if(n==="attack"){const l=i.isBoss?.3:.36;o=l,r=i.stateDuration/(1-l),a=.025}else n==="hit"?(r=i.stateDuration,a=.025):n==="death"?(r=i.stateDuration,a=.07):n==="spawn"&&(r=i.stateDuration,a=.08);e.play(n,{once:s,duration:r,fade:a,startFraction:o}),e.update(t,i.speed/2.2),(i.assetKind==="ghost"||i.assetKind==="bat")&&(i.assetVisual.position.y+=Math.sin(performance.now()*.004+i.position.x)*t*.1)}let Yh=!1;function NM(){if(Yh)return;Yh=!0;const i=yn.prototype.update;yn.prototype.update=function(...e){const n=i.apply(this,e);return IM(this,e[0]||0),n};const t=In.prototype.update;In.prototype.update=function(...e){const n=t.apply(this,e);return DM(this,e[0]||0),n}}function UM(i){NM();const t={enemySerial:0,ready:!1,heroReady:!1,failures:[]};i.assetVisualManager=t;const e=["skeleton","ghost","bat"],n=r=>{const o=e[t.enemySerial++%e.length];Kh(r,o).catch(a=>t.failures.push(String(a)))};for(const r of i.enemies)n(r);const s=i._spawnEnemy.bind(i);return i._spawnEnemy=(...r)=>{const o=s(...r);return o.isBoss?Kh(o,"demon").catch(a=>t.failures.push(String(a))):n(o),o},CM(i.player).then(()=>{t.heroReady=!!i.player.assetVisual}).catch(r=>t.failures.push(String(r))),Promise.all([ki.hero,ki.demon,ki.ghost,ki.skeleton,ki.bat].map(hl)).then(()=>{t.ready=!0}).catch(r=>{t.failures.push(String(r))}),t}const FM=new ll,Ra=new Map,Xs={arch:sn("/assets/environment/glade-arch.glb"),brokenWall:sn("/assets/environment/ruin-wall-broken.glb"),pillar:sn("/assets/environment/ruin-pillar.glb"),stairs:sn("/assets/environment/shrine-stairs.glb"),torch:sn("/assets/environment/torch-lit.glb")};function OM(i){return Ra.has(i)||Ra.set(i,FM.loadAsync(i)),Ra.get(i)}function Cc(i,t=null,e=0){return i.traverse(n=>{if(!n.isMesh||(n.castShadow=!0,n.receiveShadow=!0,!n.material))return;const r=(Array.isArray(n.material)?n.material:[n.material]).map(o=>{const a=o.clone();return a.color&&t!=null&&a.color.lerp(new yt(t),e),"roughness"in a&&(a.roughness=Math.max(.62,a.roughness??.8)),a});n.material=Array.isArray(n.material)?r:r[0]}),i}async function qs(i,t=null,e=0){const n=await OM(i);return Cc(n.scene.clone(!0),t,e)}function Ks(i,t,{x:e=0,y:n=0,z:s=0,ry:r=0,scale:o=1,name:a=""}={}){return t.position.set(e,n,s),t.rotation.y=r,t.scale.setScalar(o),t.name=a,t.userData.assetEnvironment=!0,i.add(t),t}function BM(i){if(i.portal)for(const t of i.portal.children)t===i.portalRing||t===i.portalDisc||t===i.portalLight||(t.visible=!1)}function kM(i,t,e,n,s=16754778){const r=new ci(s,1.45,5.2,2);return r.position.set(t,e,n),r.castShadow=!1,i.add(r),r}async function zM(i){const t=i.environmentAssetManager={ready:!1,count:0,failures:[],roots:[]};try{const[e,n,s,r,o]=await Promise.all([qs(Xs.arch,8426631,.08),qs(Xs.brokenWall,7702648,.1),qs(Xs.pillar,8294787,.08),qs(Xs.stairs,7768700,.08),qs(Xs.torch,null,0)]),a=i.world.decor;BM(i.world),t.roots.push(Ks(a,e,{x:0,y:0,z:-18,ry:0,scale:1.13,name:"KayKit_Glade_Arch"})),t.roots.push(Ks(a,r,{x:0,y:.01,z:-14.75,ry:Math.PI,scale:.92,name:"KayKit_Shrine_Stairs"}));const l=[[-5.9,0,-10.1,.13,.9],[5.9,0,-10.1,-.13,.9],[-8.8,0,-2.4,.38,.72],[8.8,0,-2.4,-.38,.72]];for(const[u,d,f,m,_]of l){const g=Cc(s.clone(!0),7505784,.04);t.roots.push(Ks(a,g,{x:u,y:d,z:f,ry:m,scale:_,name:"KayKit_Ruin_Pillar"}))}const c=[[-10.6,0,-7,.56,.86],[10.3,0,5.2,-1.02,.82],[-11.4,0,5.5,1.08,.68],[8.4,0,-11.4,-.52,.66]];for(const[u,d,f,m,_]of c){const g=Cc(n.clone(!0),6848622,.05);t.roots.push(Ks(a,g,{x:u,y:d,z:f,ry:m,scale:_,name:"KayKit_Broken_Ruin"}))}const h=[[-1.63,.05,-17.38,0],[1.63,.05,-17.38,Math.PI],[-5.25,.03,-9.62,.2],[5.25,.03,-9.62,-.2]];for(const[u,d,f,m]of h){const _=o.clone(!0);t.roots.push(Ks(a,_,{x:u,y:d,z:f,ry:m,scale:1.05,name:"KayKit_Lit_Torch"})),kM(a,u,d+1.55,f+.06)}return t.count=t.roots.length,t.ready=!0,t}catch(e){return t.failures.push(String(e)),console.error("Could not install KayKit environment layer; procedural world remains available.",e),t}}const HM=new ll,jh=R,Ca=new Map,Kr={pine:sn("/assets/nature/lumen-pine.glb"),bush:sn("/assets/nature/flowering-bush.glb"),fern:sn("/assets/nature/fern.glb"),grass:sn("/assets/nature/wispy-grass.glb")};function Yr(i){return Ca.has(i)||Ca.set(i,HM.loadAsync(i)),Ca.get(i)}function VM(i=1592639215){return()=>{i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function jr(i,t,{castShadow:e=!1,receiveShadow:n=!0}={}){const s=Math.min(4,t.capabilities.getMaxAnisotropy?.()||1);return i.traverse(r=>{r.isMesh&&(r.castShadow=e,r.receiveShadow=n,r.frustumCulled=!0,r.material?.map&&(r.material.map.anisotropy=s),r.material&&"roughness"in r.material&&(r.material.roughness=Math.max(.72,r.material.roughness??.8)))}),i}function $r(i,t){i.updateMatrixWorld(!0);let e=new fn().setFromObject(i);const n=e.getSize(new jh);n.y>.001&&i.scale.multiplyScalar(t/n.y),i.updateMatrixWorld(!0),e=new fn().setFromObject(i);const s=e.getCenter(new jh);return i.position.x-=s.x,i.position.z-=s.z,i.position.y-=e.min.y,i.updateMatrixWorld(!0),i}function Jr(i,t,e,n,s,r,o,a=0){const l=t.clone(!0);return l.position.x+=e,l.position.z+=n,l.scale.multiplyScalar(s),l.rotation.y=r,l.userData.assetNature=!0,l.userData.kind=o,l.userData.baseRotationZ=l.rotation.z,l.userData.sway=a,l.userData.phase=(e*.37+n*.53)%(Math.PI*2),i.add(l),l}async function GM(i){const t=i.natureAssetManager={ready:!1,count:0,failures:[],instances:[],time:0};try{const[e,n,s,r]=await Promise.all([Yr(Kr.pine),Yr(Kr.bush),Yr(Kr.fern),Yr(Kr.grass)]),o=$r(jr(e.scene.clone(!0),i.renderer,{castShadow:!0}),6.4),a=$r(jr(n.scene.clone(!0),i.renderer,{castShadow:!0}),1.15),l=$r(jr(s.scene.clone(!0),i.renderer),.72),c=$r(jr(r.scene.clone(!0),i.renderer),.42),h=i.world.decor,u=VM(),d=i.quality==="high",f=d?18:10;for(let v=0;v<f;v++){const M=v/f*Math.PI*2+(u()-.5)*.17,x=22.2+u()*6.2;if(Math.abs(Math.sin(M))<.12&&Math.cos(M)>.25)continue;const T=Jr(h,o,Math.cos(M)*x,Math.sin(M)*x,.82+u()*.48,u()*Math.PI*2,"pine",.008+u()*.012);let E=v<(d?8:4);T.traverse(C=>{C.isMesh&&(C.castShadow=E)}),t.instances.push(T)}const m=d?20:11;for(let v=0;v<m;v++){const M=u()*Math.PI*2,x=6.5+u()*15.5,T=Jr(h,a,Math.cos(M)*x,Math.sin(M)*x,.62+u()*.55,u()*Math.PI*2,"bush",.012+u()*.01);T.traverse(E=>{E.isMesh&&(E.castShadow=v<5&&d)}),t.instances.push(T)}const _=d?28:14;for(let v=0;v<_;v++){const M=u()*Math.PI*2,x=4.2+u()*19.5;t.instances.push(Jr(h,l,Math.cos(M)*x,Math.sin(M)*x,.58+u()*.55,u()*Math.PI*2,"fern",.02+u()*.018))}const g=d?36:18;for(let v=0;v<g;v++){const M=u()*Math.PI*2,x=3.2+u()*20.5;t.instances.push(Jr(h,c,Math.cos(M)*x,Math.sin(M)*x,.55+u()*.8,u()*Math.PI*2,"grass",.025+u()*.025))}t.count=t.instances.length,t.ready=!0;const p=i.world.update.bind(i.world);i.world.update=v=>{p(v),t.time+=v;for(const M of t.instances){const x=M.userData.kind==="pine"?.72:1.18;M.rotation.z=M.userData.baseRotationZ+Math.sin(t.time*x+M.userData.phase)*M.userData.sway}}}catch(e){t.failures.push(String(e)),console.error("Could not install stylized nature asset layer; procedural foliage remains available.",e)}return t}const Zr=R,WM=jt.damp,$h={skeleton:{tint:9877621,emissive:3230513,intensity:.18},ghost:{tint:8317135,emissive:2989191,intensity:.68},bat:{tint:9076673,emissive:3945839,intensity:.42},demon:{tint:13982280,emissive:7609623,intensity:.34}};function XM(i){if(!i.assetVisual||i.assetVisual.userData.cinematicLookApplied)return;const t=$h[i.assetKind]||$h.skeleton;if(i.assetVisual.userData.cinematicLookApplied=!0,i.assetVisual.traverse(e=>{if(!e.isMesh||!e.material)return;const n=Array.isArray(e.material)?e.material:[e.material];for(const s of n)s.color&&s.color.lerp(new yt(t.tint),i.assetKind==="ghost"?.34:.17),s.emissive&&(s.emissive.setHex(t.emissive),s.emissiveIntensity=Math.max(s.emissiveIntensity||0,t.intensity))}),i.assetKind==="ghost"||i.assetKind==="bat"){const e=new ci(t.tint,i.assetKind==="ghost"?.55:.3,3.2,2.2);e.position.y=i.assetKind==="ghost"?1.05:1.25,e.userData.assetAura=!0,i.root.add(e)}}function qM(i){i.renderer.toneMappingExposure=.93,i.scene.fog?.isFogExp2&&(i.scene.fog.density=.0145),i.scene.traverse(t=>{const e=t.material?.uniforms;e?.turbidity&&e?.rayleigh&&(e.turbidity.value=5.1,e.rayleigh.value=2.35,e.mieCoefficient.value=.0038,e.mieDirectionalG.value=.8)})}function KM(i){qM(i),i.bossRevealTimer=0,i.bossRevealDuration=1.8;const t=i._spawnBoss.bind(i);i._spawnBoss=()=>{t(),i.boss&&(i.boss.position.set(0,0,-14.7),i.boss.velocity.set(0,0,0),i.boss.state="spawn",i.boss.stateTime=0,i.boss.stateDuration=i.bossRevealDuration,i.bossRevealTimer=i.bossRevealDuration)};const e=i._updateEnemies.bind(i);i._updateEnemies=(s,r)=>{e(s,r);for(const o of i.enemies)XM(o)};const n=i._updateCamera.bind(i);return i._updateCamera=s=>{if(n(s),!i.boss||i.bossRevealTimer<=0)return;i.bossRevealTimer=Math.max(0,i.bossRevealTimer-s);const r=i.bossRevealTimer/i.bossRevealDuration,o=jt.smoothstep(r,0,.28),a=i.boss.position.clone(),l=i.player.position.clone(),c=a.clone().sub(l);c.y=0,c.lengthSq()<.001&&c.set(0,0,-1),c.normalize();const h=new Zr(c.z,0,-c.x),u=l.clone().addScaledVector(c,-7).addScaledVector(h,2).add(new Zr(0,4.15,0)),d=a.clone().add(new Zr(0,2,0));i.camera.position.lerp(u,(1-Math.exp(-s*8))*o);const m=l.clone().add(new Zr(0,1.35,0)).addScaledVector(c,1).lerp(d,.78*o);i.camera.lookAt(m),i.camera.fov=WM(i.camera.fov,57,9,s),i.camera.updateProjectionMatrix()},i}const YM={Knight_Body:{color:10471864,roughness:.58,metalness:.06},Knight_ArmLeft:{color:11982281,roughness:.6,metalness:.05},Knight_ArmRight:{color:11982281,roughness:.6,metalness:.05},Knight_LegLeft:{color:8694171,roughness:.64,metalness:.04},Knight_LegRight:{color:8694171,roughness:.64,metalness:.04},Knight_Head:{color:16769475,roughness:.72,metalness:0},Knight_Helmet:{color:14139780,roughness:.38,metalness:.34},Knight_Cape:{color:15691864,roughness:.82,metalness:0},Round_Shield:{color:13942133,roughness:.43,metalness:.26},"1H_Sword":{color:14283501,roughness:.22,metalness:.68,emissive:3909774,emissiveIntensity:.11}};function jM(i,t){!i||i.userData?.rowanStyled||(i.userData||={},i.userData.rowanStyled=!0,i.color&&t.color!=null&&i.color.setHex(t.color),"roughness"in i&&t.roughness!=null&&(i.roughness=t.roughness),"metalness"in i&&t.metalness!=null&&(i.metalness=t.metalness),i.emissive&&t.emissive!=null&&(i.emissive.setHex(t.emissive),i.emissiveIntensity=t.emissiveIntensity??.08),i.needsUpdate=!0)}function $M(i,t){if(!i?.material)return;const e=Array.isArray(i.material)?i.material:[i.material];for(const n of e)jM(n,t)}function JM(i){const t=i?.assetVisual;if(!t||t.userData.rowanLookApplied)return!1;t.userData.rowanLookApplied=!0,t.traverse(n=>{const s=YM[n.name];s&&$M(n,s)});const e=t.getObjectByName("1H_Sword");if(e){const n=new ci(7990223,.34,2.1,2.2);n.name="Rowan_Sword_Glow",n.position.set(.05,.12,0),n.castShadow=!1,e.add(n)}return!0}function ZM(i){const t=i.rowanStyle={ready:!1},e=performance.now(),n=()=>{if(JM(i.player)){t.ready=!0;return}performance.now()-e<15e3&&requestAnimationFrame(n)};return n(),t}const te=R,Pa=yt,en=Math.PI*2,Ia=jt.clamp,QM=jt.smoothstep;function ty(i=1296126028){return()=>{i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Ve(i,t=.9,e=0,n=0,s=0){return new Ze({color:i,roughness:t,metalness:e,emissive:n,emissiveIntensity:s,flatShading:!0})}function Jh(i,t=!0,e=!0){return i.traverse(n=>{n.isMesh&&(n.castShadow=t,n.receiveShadow=e)}),i}function ey(i="rgba(0,0,0,.72)",t="rgba(0,0,0,0)"){const e=document.createElement("canvas");e.width=e.height=128;const n=e.getContext("2d"),s=n.createRadialGradient(64,64,4,64,64,60);s.addColorStop(0,i),s.addColorStop(.42,"rgba(0,0,0,.34)"),s.addColorStop(1,t),n.fillStyle=s,n.fillRect(0,0,128,128);const r=new cd(e);return r.colorSpace=Re,r}class ny{constructor(t){this.game=t,this.scene=t.scene,this.world=t.world,this.quality=t.quality,this.time=0,this.random=ty(),this.root=new Gt,this.root.name="Showcase_Environment_Pass",this.world.decor.add(this.root),this.water=null,this.waterUniforms=null,this.foam=[],this.swayGroups=[],this.dynamicShadows=new Map,this.shadowTexture=ey(),this.silhouetteStyled=new WeakSet,this.bossPresentationActive=!1,this.bossPresentationTime=0,this.bossPresentationDuration=2.65,this.bossPresentationBoss=null,this.cinematicLight=null,this._upgradeRenderer(),this._buildTerrainComposition(),this._buildStreamAndBridge(),this._buildForegroundDetail(),this._installContactShadows(),this._upgradeCombatVfx(),this._upgradeBossPresentation(),this._upgradeUiMotion(),this._hookUpdate()}_upgradeRenderer(){const t=this.game.renderer;t.shadowMap.enabled=!0,t.shadowMap.type=Ao,t.toneMappingExposure=.98;let e=null;if(this.scene.traverse(s=>{s.isDirectionalLight&&s.castShadow&&(!e||s.intensity>e.intensity)&&(e=s)}),e){e.shadow.mapSize.set(this.quality==="high"?3072:1536,this.quality==="high"?3072:1536),e.shadow.bias=-18e-5,e.shadow.normalBias=.025;const s=e.shadow.camera;s.left=-25,s.right=25,s.top=25,s.bottom=-25,e.shadow.needsUpdate=!0}const n=new So(7916987,.5);n.position.set(12,8,-18),this.scene.add(n),this.rimLight=n}_buildTerrainComposition(){const t=Ve(4938581,.98),e=Ve(3426627,1),n=Ve(4810822,.98),s=Ve(6576451,1),r=this.random;[{a0:-.05,a1:.62,r:30,y:3,count:8},{a0:.73,a1:1.38,r:33,y:5,count:9},{a0:1.58,a1:2.34,r:31,y:3.8,count:10},{a0:2.55,a1:3.28,r:34,y:6.2,count:9},{a0:3.48,a1:4.18,r:31,y:4,count:9},{a0:4.45,a1:5.14,r:35,y:6.8,count:8},{a0:5.35,a1:6.12,r:31.5,y:4.7,count:9}].forEach((c,h)=>{for(let u=0;u<c.count;u++){const d=c.count===1?.5:u/(c.count-1),f=jt.lerp(c.a0,c.a1,d)+(r()-.5)*.055,m=c.r+(r()-.5)*2.2,_=c.y*(.78+r()*.38),g=3.5+r()*2.8,p=new $(new zi(g,1),u%4?t:e);if(p.name="Showcase_Cliff",p.position.set(Math.cos(f)*m,_*.42-1.15,Math.sin(f)*m),p.scale.set(.95+r()*.55,_/(g*1.65),.75+r()*.55),p.rotation.set((r()-.5)*.2,r()*en,(r()-.5)*.17),p.castShadow=h%2===0&&this.quality==="high",p.receiveShadow=!0,this.root.add(p),u%2===0){const v=new $(new We(g*.7,1),n);v.position.copy(p.position).add(new te(0,_*.48,0)),v.scale.set(p.scale.x*1.12,.22+r()*.12,p.scale.z*1.12),v.rotation.y=r()*en,v.receiveShadow=!0,this.root.add(v)}}});const a=[[-19,-16,5.8,1.1],[-15,18,5,.7],[17,15,6.2,.95],[20,-10,5.4,.75],[-22,3,4.2,.55],[22,5,4.5,.6]];for(const[c,h,u,d]of a){const f=new $(new Ue(u*.86,u,d,9),s);f.position.set(c,d/2-.02,h),f.receiveShadow=!0,f.castShadow=this.quality==="high",this.root.add(f);const m=new $(new Ue(u*.88,u*.9,.18,9),n);m.position.set(c,d+.03,h),m.receiveShadow=!0,this.root.add(m);for(let _=0;_<4;_++){const g=new $(new zi(.55+r()*.7,0),t),p=_/4*en+r()*.6;g.position.set(c+Math.cos(p)*u*.72,.35+d*.55,h+Math.sin(p)*u*.72),g.scale.set(1.25,.75+r()*.8,.85),g.rotation.set(r(),r()*en,r()),g.castShadow=!0,g.receiveShadow=!0,this.root.add(g)}}const l=Ve(3492681,1);for(let c=0;c<13;c++){const h=c/13*en+.18,u=62+r()*20,d=13+r()*14,f=new $(new Ce(9+r()*7,d,5),l);f.position.set(Math.cos(h)*u,d/2-3.4,Math.sin(h)*u),f.rotation.y=r()*en,f.scale.x=.72+r()*.55,f.receiveShadow=!0,this.root.add(f)}}_buildStreamAndBridge(){const t=[new te(-31,.045,12),new te(-25,.045,9),new te(-20,.045,6.5),new te(-16.5,.045,2.5),new te(-15.5,.045,-2),new te(-18,.045,-7.5),new te(-23,.045,-12),new te(-31,.045,-15)],e=new ho(t),n=this.quality==="high"?72:42,s=2.55,r=[],o=[],a=[],l=new te,c=new te,h=new te;for(let g=0;g<=n;g++){const p=g/n;e.getPointAt(p,l),e.getTangentAt(p,c).setY(0).normalize(),h.set(-c.z,0,c.x);for(const v of[-1,1])r.push(l.x+h.x*s*v,l.y,l.z+h.z*s*v),o.push(p*7.5,v<0?0:1);if(g<n){const v=g*2,M=v+1,x=v+2,T=v+3;a.push(v,x,M,x,T,M)}}const u=new be;u.setAttribute("position",new Wt(r,3)),u.setAttribute("uv",new Wt(o,2)),u.setIndex(a),u.computeVertexNormals(),this.waterUniforms={uTime:{value:0},uDeep:{value:new Pa(1457994)},uShallow:{value:new Pa(489e4)},uSun:{value:new Pa(13494478)}};const d=new Oe({uniforms:this.waterUniforms,transparent:!0,depthWrite:!1,side:fe,vertexShader:`
        uniform float uTime;
        varying vec2 vUv;
        varying float vWave;
        void main(){
          vUv=uv;
          vec3 p=position;
          float wave=sin(p.x*1.7 + uTime*2.2)*.035 + sin(p.z*2.9-uTime*1.45)*.022;
          p.y += wave;
          vWave=wave;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
        }
      `,fragmentShader:`
        uniform float uTime;
        uniform vec3 uDeep;
        uniform vec3 uShallow;
        uniform vec3 uSun;
        varying vec2 vUv;
        varying float vWave;
        void main(){
          float edge=smoothstep(0.0,.2,vUv.y)*smoothstep(1.0,.8,vUv.y);
          float flow=sin(vUv.x*12.0-uTime*4.0+sin(vUv.x*2.5)*2.0);
          float ripple=sin(vUv.x*28.0+vUv.y*9.0-uTime*5.2)*.5+.5;
          float sparkle=pow(max(0.0,flow*.5+.5),18.0)*(.25+.75*ripple);
          vec3 col=mix(uDeep,uShallow,.38+.34*edge+.18*vWave*10.0);
          col += uSun*sparkle*.42;
          float alpha=.78 + sparkle*.12;
          gl_FragColor=vec4(col,alpha);
        }
      `});this.water=new $(u,d),this.water.name="Showcase_Stream_Water",this.water.renderOrder=2,this.root.add(this.water);const f=Ve(5399903,.94),m=Ve(4155728,.98);for(let g=0;g<=36;g++){const p=g/36;e.getPointAt(p,l),e.getTangentAt(p,c).setY(0).normalize(),h.set(-c.z,0,c.x);for(const v of[-1,1]){const M=(this.random()-.5)*.55,x=l.clone().addScaledVector(h,v*(s+.2+this.random()*.75)).addScaledVector(c,M),T=new $(new zi(.18+this.random()*.34,0),g%5?f:m);T.position.copy(x).setY(.08+this.random()*.08),T.scale.set(1.3+this.random(),.45+this.random()*.45,.75+this.random()*.8),T.rotation.set(this.random(),this.random()*en,this.random()),T.castShadow=g%3===0,T.receiveShadow=!0,this.root.add(T)}}const _=new Nt({color:14087397,transparent:!0,opacity:.26,depthWrite:!1,blending:se});for(let g=0;g<18;g++){const p=(g+.35)/18;e.getPointAt(p,l);const v=new $(new Gi(.22,.28,12,1,0,Math.PI*(1.2+this.random()*.6)),_.clone());v.rotation.x=-Math.PI/2,v.rotation.z=this.random()*en,v.position.copy(l).add(new te((this.random()-.5)*2.6,.055,(this.random()-.5)*1.6)),v.userData.phase=this.random()*en,this.root.add(v),this.foam.push(v)}this._buildBridge(new te(-16,.08,1.3),-.24)}_buildBridge(t,e){const n=new Gt;n.name="Showcase_Hero_Bridge",n.position.copy(t),n.rotation.y=e;const s=Ve(7558459,.82),r=Ve(4799281,.94),o=Ve(10256474,.96),a=Ve(6122342,.96);for(const c of[-3.25,3.25])for(const h of[-1.25,1.25]){const u=new $(new zi(.82,0),a);u.position.set(h,.15,c),u.scale.set(1.15,.75,1.3),u.castShadow=!0,u.receiveShadow=!0,n.add(u)}const l=18;for(let c=0;c<l;c++){const h=c/(l-1),u=jt.lerp(-3.25,3.25,h),d=Math.sin(h*Math.PI)*.45,f=new $(new Ee(3.25,.16,.34),s);f.position.set((this.random()-.5)*.06,.38+d,u),f.rotation.y=(this.random()-.5)*.018,f.rotation.z=(this.random()-.5)*.016,f.castShadow=!0,f.receiveShadow=!0,n.add(f)}for(const c of[-1.58,1.58]){for(const d of[-3.05,-1.55,0,1.55,3.05]){const f=(d+3.25)/6.5,m=Math.sin(f*Math.PI)*.45,_=new $(new Ue(.095,.12,1.32,7),r);_.position.set(c,1.02+m,d),_.castShadow=!0,n.add(_)}const h=new ho([new te(c,1.45,-3.05),new te(c,1.62,-1.55),new te(c,1.85,0),new te(c,1.62,1.55),new te(c,1.45,3.05)]),u=new $(new yo(h,24,.035,6,!1),o);u.castShadow=!0,n.add(u)}Jh(n,!0,!0),this.root.add(n)}_buildForegroundDetail(){const t=this.random,e=Ve(5405005,.96),n=new Ze({color:13937011,roughness:.75,emissive:6044453,emissiveIntensity:.08,flatShading:!0});for(let r=0;r<(this.quality==="high"?34:18);r++){const o=r%2?-1:1,a=11-r/34*25+(t()-.5)*3,l=-19+o*(2.2+t()*2.7)+Math.sin(a*.18)*2.5,c=new Gt;c.position.set(l,0,a),c.rotation.y=t()*en,c.userData.baseZ=0,c.userData.phase=t()*en,c.userData.sway=.028+t()*.04;const h=3+Math.floor(t()*4);for(let u=0;u<h;u++){const d=.45+t()*.65,f=new $(new Ce(.025+t()*.025,d,4),e);if(f.position.set((t()-.5)*.38,d/2,(t()-.5)*.35),f.rotation.z=(t()-.5)*.24,c.add(f),u===0&&r%3===0){const m=new $(new We(.055,0),n);m.position.set(f.position.x,d+.03,f.position.z),c.add(m)}}this.root.add(c),this.swayGroups.push(c)}const s=new Fe(.025,5,4);for(let r=0;r<(this.quality==="high"?32:14);r++){const o=new Nt({color:r%5?10346951:16765572,transparent:!0,opacity:.22+t()*.35,blending:se,depthWrite:!1}),a=new $(s,o);a.position.set(-20+t()*11,.55+t()*4.2,-7+t()*19),a.userData.showcaseMote=!0,a.userData.base=a.position.clone(),a.userData.phase=t()*en,a.userData.speed=.35+t()*.7,this.root.add(a)}}_installContactShadows(){this.shadowMaterial=new Nt({map:this.shadowTexture,transparent:!0,opacity:.52,depthWrite:!1,color:1516062}),this._ensureShadow(this.game.player.root,1.25,.42,"player")}_ensureShadow(t,e,n,s){if(!t||this.dynamicShadows.has(t))return;const r=this.shadowMaterial.clone();r.opacity=n;const o=new $(new ai(e*2,e*2),r);o.rotation.x=-Math.PI/2,o.position.y=.018,o.renderOrder=1,o.userData.baseScale=e,o.userData.shadowKey=s,this.world.decor.add(o),this.dynamicShadows.set(t,o)}_styleEnemySilhouette(t){if(!t||t.remove||!t.assetVisual||this.silhouetteStyled.has(t))return;this.silhouetteStyled.add(t);const e=t.assetKind||(t.isBoss?"demon":"skeleton"),n=new Gt;if(n.name=`Showcase_Silhouette_${e}`,n.userData.showcaseAccessory=!0,e==="skeleton"){const s=Ve(3094325,.7,.25),r=Ve(7241289,.45,.08,3230248,.36);for(const a of[-1,1]){const l=new $(new Ce(.18,.65,5),s);l.position.set(a*.48,1.14,.02),l.rotation.z=-a*1.17,n.add(l)}const o=new $(new Ce(.11,.8,5),r);o.position.set(0,1.72,-.08),n.add(o)}else if(e==="ghost"){const s=new Nt({color:8647381,transparent:!0,opacity:.42,blending:se,depthWrite:!1,side:fe}),r=new $(new dn(.58,.025,6,32),s);r.position.y=1.52,r.rotation.x=Math.PI/2,n.add(r);for(let o=0;o<3;o++){const a=new $(new dn(.34+o*.13,.015,5,26,Math.PI*1.25),s.clone());a.position.y=.35+o*.18,a.rotation.set(Math.PI/2,o*1.5,o*.8),n.add(a)}}else if(e==="bat"){const s=Ve(3159096,.88,.04,2761807,.18);for(const r of[-1,1]){const o=new $(new Ce(.12,.95,5),s);o.position.set(r*.82,1.05,-.18),o.rotation.z=-r*1.13,n.add(o)}}else if(e==="demon"){const s=Ve(2498333,.82,.08,4921108,.22);for(let o=-2;o<=2;o++){const a=new $(new Ce(.12+Math.abs(o)*.025,1.25-Math.abs(o)*.1,6),s);a.position.set(o*.42,2.25+(2-Math.abs(o))*.24,-.48),a.rotation.x=-.55,a.rotation.z=o*.08,n.add(a)}const r=new $(new dn(.72,.045,7,40),new Nt({color:16739406,transparent:!0,opacity:.38,blending:se,depthWrite:!1}));r.position.y=3.35,r.rotation.x=Math.PI/2,n.add(r)}Jh(n,!0,!0),t.root.add(n),this._ensureShadow(t.root,t.isBoss?1.95:.83,t.isBoss?.56:.42,e)}_upgradeCombatVfx(){const t=this.game,e=t.fx.slash.bind(t.fx);t.fx.slash=(r,o,a=0)=>{e(r,o,a),this._spawnSwordRibbon(r,o,a)};const n=t._castSpell.bind(t);t._castSpell=()=>{const r=t.player.position.clone();n(),this._spawnSpellSigil(r,t.player.facing)};const s=t._resolveMelee.bind(t);t._resolveMelee=()=>{const r=t.enemies.map(l=>({e:l,hp:l.hp})),o=t.player.comboIndex,a=t.player.position.clone();s();for(const l of r)l.e.hp<l.hp&&this._spawnImpact(l.e.position.clone().add(new te(0,l.e.isBoss?1.8:.9,0)),o,l.e.isBoss);r.some(l=>l.e.hp<l.hp)&&o===2&&this._spawnGroundFracture(a,t.player.facing)}}_spawnSwordRibbon(t,e,n){const s=[],r=n===2?2:1.55,o=e-1.25,a=n===2?2.55:2.1;for(let m=0;m<=12;m++){const _=m/12,g=o+a*_;s.push(new te(Math.sin(g)*r,1.05+Math.sin(_*Math.PI)*.5,Math.cos(g)*r))}const l=new ho(s),c=new yo(l,22,n===2?.065:.045,5,!1),h=n===2?16765050:n===1?11204314:14811120,u=new Nt({color:h,transparent:!0,opacity:.82,blending:se,depthWrite:!1}),d=new $(c,u);d.position.copy(t),this.game.fx.add(d,.19,(m,_,g)=>{m.obj.material.opacity=(1-g)*.78,m.obj.scale.multiplyScalar(1+_*2.1)});const f=new ci(h,n===2?1.8:.9,3.4,2.2);f.position.copy(t).add(new te(0,1.2,0)),this.game.fx.add(f,.12,(m,_,g)=>{m.obj.intensity=(1-g)*(n===2?1.8:.9)})}_spawnImpact(t,e,n){const s=e===2?16765820:12120788,r=new Nt({color:s,transparent:!0,opacity:1,blending:se,depthWrite:!1,side:fe}),o=new $(new dr(n?.36:.23,0),r);o.position.copy(t),this.game.fx.add(o,.16,(a,l,c)=>{a.obj.scale.setScalar(.6+c*(n?4.4:3.2)),a.obj.material.opacity=Math.pow(1-c,2),a.obj.rotation.y+=l*10}),this.game.fx.burst(t,s,n?22:13,n?6.2:4.8,n?1.15:.8),this.game.fx.ring(t.clone().setY(.06),s,.1,n?2.6:1.55,.24)}_spawnGroundFracture(t,e){const n=new Nt({color:15844469,transparent:!0,opacity:.42,blending:se,depthWrite:!1});for(let s=0;s<7;s++){const r=new $(new ai(.035,.65+this.random()*.8),n.clone()),o=e+(this.random()-.5)*1.6,a=.4+this.random()*1.1;r.rotation.x=-Math.PI/2,r.rotation.z=-o,r.position.copy(t).add(new te(Math.sin(o)*a,.025,Math.cos(o)*a)),this.game.fx.add(r,.38,(l,c,h)=>{l.obj.material.opacity=(1-h)*.4,l.obj.scale.y=1+h*.8})}}_spawnSpellSigil(t,e){const n=t.clone().add(new te(0,.07,0)),s=[16754539,16766086,8185808];for(let o=0;o<3;o++){const a=new $(new Gi(.48+o*.24,.51+o*.24,36),new Nt({color:s[o],transparent:!0,opacity:.55-o*.08,side:fe,blending:se,depthWrite:!1}));a.rotation.x=-Math.PI/2,a.position.copy(n),a.rotation.z=o*.7,this.game.fx.add(a,.62+o*.1,(l,c,h)=>{l.obj.rotation.z+=c*(o%2?-3.2:3.8),l.obj.scale.setScalar(.55+QM(h,0,1)*.8),l.obj.material.opacity=Math.sin(Math.PI*h)*(.52-o*.08)})}const r=new te(Math.sin(e),0,Math.cos(e));for(let o=0;o<16;o++){const a=o/16*en,l=new $(new Fe(.035,6,4),new Nt({color:o%3?16757357:9168594,transparent:!0,opacity:.8,blending:se,depthWrite:!1}));l.position.copy(n).add(new te(Math.cos(a)*.7,.12+o%4*.05,Math.sin(a)*.7)).addScaledVector(r,.2);const c=a;this.game.fx.add(l,.55+this.random()*.25,(h,u,d)=>{h.obj.position.y+=u*(1.1+o*.018),h.obj.position.x+=Math.cos(c+d*5)*u*.3,h.obj.position.z+=Math.sin(c+d*5)*u*.3,h.obj.material.opacity=(1-d)*.78})}}_upgradeBossPresentation(){const t=this.game,e=t._spawnBoss.bind(t);t._spawnBoss=()=>{if(e(),!t.boss)return;this.bossPresentationActive=!0,this.bossPresentationTime=0,this.bossPresentationBoss=t.boss,document.documentElement.classList.add("boss-cinematic");const n=document.querySelector("#showcase-boss-title");n&&(n.querySelector("strong").textContent="THORNMAW",n.querySelector("span").textContent="OATH-SWORN WARDEN");const s=new ci(16737599,0,12,1.8);s.position.copy(t.boss.position).add(new te(0,2,1)),this.scene.add(s),this.cinematicLight=s,this._bossShockwave(t.boss.position),setTimeout(()=>document.documentElement.classList.remove("boss-cinematic"),this.bossPresentationDuration*1e3)}}_bossShockwave(t){const e=new Nt({color:7289393,transparent:!0,opacity:.22,depthWrite:!1,blending:se});for(let n=0;n<12;n++){const s=n/12*en,r=new $(new We(.35+this.random()*.25,1),e.clone());r.position.copy(t).add(new te(Math.cos(s)*1.1,.3+this.random()*.45,Math.sin(s)*1.1));const o=new te(Math.cos(s)*(1.7+this.random()),.25+this.random()*.5,Math.sin(s)*(1.7+this.random()));this.game.fx.add(r,.85+this.random()*.3,(a,l,c)=>{a.obj.position.addScaledVector(o,l),a.obj.scale.multiplyScalar(1+l*1.2),a.obj.material.opacity=(1-c)*.2})}this.game.fx.ring(t,16740429,.3,7.8,.9),this.game.fx.ring(t,16761210,.15,4.5,.55)}_upgradeUiMotion(){if(!document.querySelector("#showcase-cinematic-bars")){const s=document.createElement("div");s.id="showcase-cinematic-bars",s.innerHTML="<i></i><i></i>",document.body.appendChild(s)}if(!document.querySelector("#showcase-boss-title")){const s=document.createElement("div");s.id="showcase-boss-title",s.innerHTML="<span>OATH-SWORN WARDEN</span><strong>THORNMAW</strong><em></em>",document.body.appendChild(s)}const t=this.game,e=t._addCombatCombo.bind(t);t._addCombatCombo=()=>{e(),t.ui.combo.classList.remove("showcase-pop"),t.ui.combo.offsetWidth,t.ui.combo.classList.add("showcase-pop")};const n=t.toast.bind(t);t.toast=(s,r=1.1)=>{n(s,r),t.ui.toast.classList.remove("showcase-toast-in"),t.ui.toast.offsetWidth,t.ui.toast.classList.add("showcase-toast-in")}}_hookUpdate(){const t=this.world.update.bind(this.world);this.world.update=e=>{t(e),this.update(e)}}update(t){this.time+=t,this.waterUniforms&&(this.waterUniforms.uTime.value=this.time);for(const s of this.foam){const r=s.userData.phase;s.material.opacity=.16+(Math.sin(this.time*2.8+r)*.5+.5)*.18,s.rotation.z+=t*.12;const o=1+Math.sin(this.time*2+r)*.08;s.scale.setScalar(o)}const e=.48+.52*(Math.sin(this.time*.31)*.5+.5);for(const s of this.swayGroups)s.rotation.z=s.userData.baseZ+Math.sin(this.time*1.05+s.userData.phase)*s.userData.sway*(1+e*.75)+Math.sin(this.time*2.8+s.userData.phase*1.7)*s.userData.sway*.18;const n=this.game.natureAssetManager;if(n?.instances){for(let s=0;s<n.instances.length;s++){const r=n.instances[s];r.userData.showcaseWind||(r.userData.showcaseWind=!0,r.userData.showcaseBaseZ=r.userData.baseRotationZ??r.rotation.z)}for(let s=0;s<n.instances.length;s++){const r=n.instances[s],o=r.userData.kind==="pine"?.007:r.userData.kind==="grass"?.025:.016,a=r.userData.phase||s;r.rotation.z+=Math.sin(this.time*2.35+a*1.7)*o*e}}this.root.traverse(s=>{if(!s.userData.showcaseMote)return;const r=s.userData;s.position.x=r.base.x+Math.sin(this.time*r.speed+r.phase)*.42,s.position.y=r.base.y+Math.sin(this.time*r.speed*.73+r.phase*1.4)*.32,s.position.z=r.base.z+Math.cos(this.time*r.speed*.61+r.phase)*.36,s.material.opacity=.18+.34*(Math.sin(this.time*1.3+r.phase)*.5+.5)});for(const s of this.game.enemies)this._styleEnemySilhouette(s);this._ensureShadow(this.game.player.root,1.25,.42,"player");for(const[s,r]of this.dynamicShadows){if(!s.parent||s.visible===!1){r.visible=!1;continue}r.visible=!0,r.position.x=s.position.x,r.position.z=s.position.z;const o=Math.max(0,s.position.y||0);r.material.opacity=(r.userData.shadowKey==="demon"?.56:.42)*Ia(1-o*.3,.25,1)}this.bossPresentationActive&&this._updateBossPresentation(t)}_updateBossPresentation(t){const e=this.bossPresentationBoss;if(!e||e.remove){this.bossPresentationActive=!1;return}this.bossPresentationTime+=t;const n=Ia(this.bossPresentationTime/this.bossPresentationDuration,0,1);if(this.cinematicLight&&(this.cinematicLight.position.copy(e.position).add(new te(0,2,1)),this.cinematicLight.intensity=Math.sin(Math.PI*Ia(n*1.3,0,1))*5.2),n>.18&&n<.52){const s=1-Math.abs((n-.35)/.17);this.game.cameraShake=Math.max(this.game.cameraShake,Math.max(0,s)*.44)}n>=1&&(this.bossPresentationActive=!1,this.cinematicLight&&(this.scene.remove(this.cinematicLight),this.cinematicLight=null))}}function iy(i){if(i.showcasePass)return i.showcasePass;const t=new ny(i);return i.showcasePass=t,t}const Vn=R,bo=un,wo=Mn,Te=jt.clamp,ul=jt.damp,Dd=new WeakMap,Pc=new WeakMap,sy=new We(.115,0),dl=new yt(16765047),Nd=new yt(12189668),Ud=new yt(16777215);function ry(i){return Math.atan2(Math.sin(i),Math.cos(i))}function oy(i){const t=[],e=new Set;return i?.traverse(n=>{if(!n.material)return;const s=Array.isArray(n.material)?n.material:[n.material];for(const r of s)!r||e.has(r)||(e.add(r),t.push(r))}),t}function Fd(i){return oy(i).filter(t=>t.emissive).map(t=>({material:t,emissive:t.emissive.clone(),intensity:t.emissiveIntensity||0}))}function Ic(i,t){let e=null;return i?.traverse(n=>{!e&&t(n.name||"",n)&&(e=n)}),e}function ay(i){const t=Ic(i,n=>/(^|_)1h_sword($|_)/i.test(n)||/sword/i.test(n));if(!t)return null;if(t.isMesh&&t.geometry)return t;let e=null;return t.traverse(n=>{!e&&n.isMesh&&n.geometry&&(e=n)}),e}function cy(i,t,e){if(!i?.geometry)return!1;const n=i.geometry;n.boundingBox||n.computeBoundingBox();const s=n.boundingBox;if(!s)return!1;const r=s.getSize(new Vn),o=s.getCenter(new Vn);let a="y";return r.x>r.y&&r.x>r.z?a="x":r.z>r.y&&r.z>r.x&&(a="z"),t.copy(o),e.copy(o),t[a]=s.min[a],e[a]=s.max[a],i.localToWorld(t),i.localToWorld(e),Number.isFinite(t.x+t.y+t.z+e.x+e.y+e.z)}class ly{constructor(t){this.scene=t,this.samples=[],this.geometry=new be,this.material=new Nt({color:16777215,transparent:!0,opacity:.72,side:fe,depthWrite:!1,blending:se,vertexColors:!0}),this.mesh=new $(this.geometry,this.material),this.mesh.name="RowanWeaponMotionRibbon",this.mesh.frustumCulled=!1,this.mesh.renderOrder=8,this.mesh.visible=!1,t.add(this.mesh),this.a=new Vn,this.b=new Vn,this.combo=0}update(t,e,n,s=0,r=1){for(const u of this.samples)u.life-=t;if(this.samples=this.samples.filter(u=>u.life>0),this.combo=s,n&&cy(e,this.a,this.b)){const u=this.samples[this.samples.length-1],d=this.a.clone().add(this.b).multiplyScalar(.5),f=u?u.a.clone().add(u.b).multiplyScalar(.5):null;for((!f||d.distanceToSquared(f)>45e-5)&&this.samples.push({a:this.a.clone(),b:this.b.clone(),life:.14+r*.045,energy:r});this.samples.length>10;)this.samples.shift()}if(this.samples.length<2){this.mesh.visible=!1;return}const o=[],a=[],l=[],c=s===2?dl:Nd,h=this.samples.length;for(let u=0;u<h;u++){const d=this.samples[u],f=u/Math.max(1,h-1),m=c.clone().lerp(Ud,f*.34),_=.2+f*.8;if(o.push(d.a.x,d.a.y,d.a.z,d.b.x,d.b.y,d.b.z),a.push(m.r*_,m.g*_,m.b*_,m.r*_,m.g*_,m.b*_),u<h-1){const g=u*2,p=g+1,v=g+2,M=g+3;l.push(g,v,p,p,v,M)}}this.geometry.setAttribute("position",new Wt(o,3)),this.geometry.setAttribute("color",new Wt(a,3)),this.geometry.setIndex(l),this.geometry.computeBoundingSphere(),this.material.opacity=s===2?.82:.67,this.mesh.visible=!0}}function Lc(i,t,e=1,n=0,s=0){if(!i?.add)return;const r=new Vn(Math.cos(n),0,-Math.sin(n)),o=t.clone().addScaledVector(r,s),a=Math.max(2,Math.round(3*e));for(let l=0;l<a;l++){const c=new Nt({color:l%3===0?10193513:7438436,transparent:!0,opacity:.2+Math.random()*.13,depthWrite:!1}),h=new $(sy,c);h.userData.disposeMaterial=!0,h.position.copy(o).add(new Vn((Math.random()-.5)*.38*e,.05+Math.random()*.11,(Math.random()-.5)*.38*e)),h.scale.setScalar(.45+Math.random()*.7*e);const u=new Vn((Math.random()-.5)*.65*e,.25+Math.random()*.4,(Math.random()-.5)*.65*e);i.add(h,.34+Math.random()*.22,(d,f,m)=>{d.obj.position.addScaledVector(u,f),d.obj.scale.multiplyScalar(1+f*(1.25+e*.45)),d.obj.material.opacity=(1-m)*.24})}}function hy(i,t){if(!i.assetVisual?.userData?.rowanLookApplied)return null;if(i._animationPolish?.model===i.assetVisual)return i._animationPolish;const e=i.assetVisual,n=ay(e),s=Ic(e,a=>/cape/i.test(a)),r=Ic(e,a=>/hair/i.test(a)),o={model:e,restPosition:e.position.clone(),restQuaternion:e.quaternion.clone(),restScale:e.scale.clone(),sword:n,swordGlow:n?Fd(n):[],cape:s,capeRest:s?.quaternion.clone()||null,hair:r,hairRest:r?.quaternion.clone()||null,ribbon:new ly(i.scene),lastSpeed:i.speed||0,lastFacing:i.facing||0,strideDistance:0,foot:-1,stateKey:i.state};return i._animationPolish=o,t.playerReady=!0,t.secondaryMotionReady=!!(s||r),t.trailReady=!!n,o}function uy(i,t,e,n,s,r){if(i.cape&&i.capeRest){const o=Math.sin(performance.now()*.0082)*(.025+n*.04),a=.03+n*.32+Te(r*.012,-.05,.08),l=Te(-s*.014,-.1,.1)+o,c=new bo().setFromEuler(new wo(a,0,l,"XYZ")),h=i.capeRest.clone().multiply(c);i.cape.quaternion.slerp(h,1-Math.exp(-e*8.5))}if(i.hair&&i.hairRest&&i.hair!==i.cape){const o=Math.sin(performance.now()*.011+1.2)*(.018+n*.025),a=new bo().setFromEuler(new wo(-n*.055,0,Te(-s*.008,-.055,.055)+o,"XYZ")),l=i.hairRest.clone().multiply(a);i.hair.quaternion.slerp(l,1-Math.exp(-e*10))}}function dy(i,t,e){if(!i.swordGlow.length)return;const n=t.state==="attack",s=n?Te(t.stateTime/t.stateDuration,0,1):0,r=n?Math.sin(Math.PI*Te((s-.12)/.74,0,1)):0,o=t.comboIndex===2?1.45:1,a=t.comboIndex===2?dl:Nd;for(const l of i.swordGlow){const c=l.material,h=r*o;c.emissive.copy(l.emissive).lerp(a,Te(h*.68,0,.82)),c.emissiveIntensity=ul(c.emissiveIntensity||0,l.intensity+h*1.45,16,e)}}function fy(i,t){const e=Dd.get(i);if(!e||!i.assetVisual)return;const n=hy(i,e);if(!n)return;const s=performance.now()*.001,r=i.speed||0,o=Te(r/5.25,0,1),a=t>1e-4?Te((r-n.lastSpeed)/t,-22,22):0,l=t>1e-4?ry(i.facing-n.lastFacing)/t:0,c=r>.45&&!["attack","dodge","hurt","dead"].includes(i.state);let h=Te(-a*.0065,-.075,.075)-o*.018,u=Te(l*.018*o,-.11,.11),d=c?Math.sin(s*(8.1+o*3.4))*.009*o:Math.sin(s*2.15)*.005,f=0;if(i.state==="attack"){const v=Te(i.stateTime/i.stateDuration,0,1),M=Math.sin(Math.PI*Te((v-.08)/.78,0,1));h-=M*(i.comboIndex===2?.115:.055),u+=(i.comboIndex===0?-.045:i.comboIndex===1?.045:-.025)*M,f=Math.sin(Math.PI*v)*(i.comboIndex===2?.018:.008),d=0}else if(i.state==="dodge"){const v=Te(i.stateTime/i.stateDuration,0,1);h-=Math.sin(Math.PI*v)*.1,d-=Math.sin(Math.PI*v)*.035}else if(i.state==="hurt"){const v=Te(i.stateTime/Math.max(.01,i.stateDuration),0,1);h+=Math.sin(Math.PI*v)*.06}const m=n.restQuaternion.clone().multiply(new bo().setFromEuler(new wo(h,0,u,"XYZ")));n.model.quaternion.slerp(m,1-Math.exp(-t*13)),n.model.position.copy(n.restPosition),n.model.position.y+=d,n.model.scale.copy(n.restScale).multiply(new Vn(1+f*.5,1-f,1+f*.5)),uy(n,i,t,o,l,a),dy(n,i,t);const _=i.state==="attack"?i.stateTime/Math.max(.01,i.stateDuration):0,g=i.root.visible&&i.state==="attack"&&_>.13&&_<.88,p=i.comboIndex===2?1.35:1;if(n.ribbon.update(t,n.sword,g,i.comboIndex,p),e.trailActive=n.ribbon.mesh.visible,e.trailSamples=n.ribbon.samples.length,c&&r>1.1){n.strideDistance+=r*t;const v=r>3.2?1.48:1.05;n.strideDistance>=v&&(n.strideDistance%=v,n.foot*=-1,Lc(i.fx,i.position,.62+o*.48,i.facing,n.foot*.18),e.footstepEvents++)}else n.strideDistance=Math.min(n.strideDistance,.35);n.stateKey!==i.state&&(i.state==="dodge"&&(Lc(i.fx,i.position,1.05,i.facing,0),e.impactEvents++),n.stateKey=i.state),n.lastSpeed=r,n.lastFacing=i.facing}function py(i,t){if(!i.assetVisual?.userData?.cinematicLookApplied)return null;if(i._animationPolish?.model===i.assetVisual)return i._animationPolish;const e=i.assetVisual,n={model:e,restPosition:e.position.clone(),restQuaternion:e.quaternion.clone(),restScale:e.scale.clone(),glowMaterials:Fd(e),lastState:i.state,lastAttackSerial:i.attackSerial,hitSign:Math.random()<.5?-1:1,bossLight:null};if(i.isBoss){const s=new ci(16738378,0,7.5,2);s.position.set(0,2.15,.5),s.userData.animationPolish=!0,i.root.add(s),n.bossLight=s}return i._animationPolish=n,t.enemyPolished++,i.isBoss&&(t.bossPolished=!0),n}function my(i,t,e,n){const s=t.hitFlash>0?Te(t.hitFlash/.12,0,1):0,r=t.isBoss?n:0;for(const o of i.glowMaterials){const a=o.material,l=Math.max(s*1.15,r*.78),c=s>r?Ud:dl;a.emissive.copy(o.emissive).lerp(c,Te(l*.72,0,.88)),a.emissiveIntensity=ul(a.emissiveIntensity||0,o.intensity+l*1.6,18,e)}}function gy(i,t){const e=Pc.get(i);if(!e||!i.assetVisual||i.remove)return;const n=py(i,e);if(!n)return;const s=performance.now()*.001,r=i.state==="chase"&&i.velocity.lengthSq()>.05;let o=r?-.025:0,a=r?Math.sin(s*(i.isBoss?4.2:7.2))*(i.isBoss?.018:.028):0,l=n.restPosition.y,c=1,h=1,u=1,d=0;if(i.assetKind==="ghost"?l+=Math.sin(s*3.2+i.position.x*.17)*.075:i.assetKind==="bat"?l+=Math.sin(s*5.1+i.position.z*.13)*.055:r&&(l+=Math.abs(Math.sin(s*(i.isBoss?4.4:7.5)))*(i.isBoss?.025:.018)),i.state==="windup"){const m=Te(i.stateTime/Math.max(.01,i.stateDuration),0,1);d=m*m,o+=(i.isBoss?.085:.055)*m,c+=m*(i.isBoss?.028:.018),h-=m*(i.isBoss?.025:.014),u+=m*(i.isBoss?.035:.02),a+=Math.sin(s*27)*.008*m}else if(i.state==="attack"){const m=Te(i.stateTime/Math.max(.01,i.stateDuration),0,1),_=Math.sin(Math.PI*Te(m/.72,0,1));o-=_*(i.isBoss?.13:.085),h+=_*.018,u+=_*.026}else if(i.state==="stagger"){const m=Te(i.stateTime/Math.max(.01,i.stateDuration),0,1);a+=n.hitSign*Math.sin(Math.PI*m)*.13,o+=Math.sin(Math.PI*m)*.06}else if(i.isBoss&&i.state==="idle"){const m=Math.sin(s*1.9)*.006;c+=m,h-=m*.5,u+=m}const f=n.restQuaternion.clone().multiply(new bo().setFromEuler(new wo(o,0,a,"XYZ")));if(n.model.quaternion.slerp(f,1-Math.exp(-t*(i.isBoss?9:12))),n.model.position.copy(n.restPosition),n.model.position.y=l,n.model.scale.copy(n.restScale).multiply(new Vn(c,h,u)),my(n,i,t,d),n.bossLight){let m=0;i.state==="windup"?m=.35+d*2.4:i.state==="attack"&&(m=2.1),n.bossLight.intensity=ul(n.bossLight.intensity,m,16,t)}if(n.lastState!==i.state){if(i.state==="attack"){const m=i.isBoss?1.9:.72;Lc(i.fx,i.position,m,i.facing,0),i.isBoss&&i.fx.burst(i.position.clone().add(new Vn(0,.35,0)),16751207,10,3.1,1.15),e.impactEvents++}else i.state==="stagger"&&(n.hitSign*=-1);n.lastState=i.state}n.lastAttackSerial=i.attackSerial}let Zh=!1;function _y(){if(Zh)return;Zh=!0;const i=yn.prototype.update;yn.prototype.update=function(...e){const n=i.apply(this,e);return fy(this,e[0]||0),n};const t=In.prototype.update;In.prototype.update=function(...e){const n=t.apply(this,e);return gy(this,e[0]||0),n}}function vy(i){_y();const t={ready:!0,playerReady:!1,secondaryMotionReady:!1,trailReady:!1,trailActive:!1,trailSamples:0,enemyPolished:0,bossPolished:!1,footstepEvents:0,impactEvents:0};i.animationPolishManager=t,Dd.set(i.player,t);for(const n of i.enemies)Pc.set(n,t);const e=i._spawnEnemy.bind(i);return i._spawnEnemy=(...n)=>{const s=e(...n);return Pc.set(s,t),s},t}function Sn(i){return Math.max(0,Math.min(1,i))}function Dc(i,t,e){if(i===t)return e<i?0:1;const n=Sn((e-i)/(t-i));return n*n*(3-2*n)}function Od(i){return Math.atan2(Math.sin(i),Math.cos(i))}function Qh(i,t=5.25,e=0){const n=Sn(i/Math.max(.001,t)),s=Dc(.035,.17,n),r=Dc(.47,.82,n),o=Sn(e)*s,a=Math.max(0,1-o),l=(1-s)*a,c=s*a,h=c*(1-r),u=c*r,d=l+h+u+o;return d<=1e-5?{idle:1,walk:0,run:0,turn:0,speed01:n}:{idle:l/d,walk:h/d,run:u/d,turn:o/d,speed01:n}}function tu(i,t,e){const n=(i%1+1)%1,s=(t%1+1)%1,r=(e%1+1)%1;return s>=n?n<r&&s>=r:n<r||s>=r}function xy(i,t){return Math.abs(((i-t+.5)%1+1)%1-.5)}function eu(i,t,e=.105,n=.23){const s=xy(i,t);return s<=e?1:s>=n?0:1-Dc(e,n,s)}function Qr(i,t){if(i<0||i>=t||t<=0)return 0;const e=i/t;return Math.sin(Math.PI*e)}function My(i,t,e,n,s){const r=t-n,o=e-s,a=Math.hypot(r,o);if(a<1e-5)return{front:1,side:0,angle:0};const l=Math.atan2(r/a,o/a),c=Od(l-i);return{front:Math.cos(c),side:Math.sin(c),angle:c}}const xi=R,To=un,Nc=Mn,xn=jt.clamp,yy=jt.damp,nu={idle:["Idle"],walk:["Walking_A","Walking_B"],run:["Running_A","Running_B"],turnLeft:["Running_Strafe_Left"],turnRight:["Running_Strafe_Right"],deathPose:["Death_A_Pose","Death_B_Pose"]},Uc=["idle","walk","run","turnLeft","turnRight"],Sy=new Set(["attack","dodge","hurt","cast","dead"]),Bd=.12,kd=.62;function Do(){return performance.now()*.001}function Eo(i,t=i?.state){return!!(i&&!i.dead&&!Sy.has(t))}function iu(i,t){for(const e of t){const n=i.find(r=>r.name===e);if(n)return n;const s=i.find(r=>r.name.toLowerCase().includes(e.toLowerCase()));if(s)return s}return null}function nn(i,t){if(!i)return null;const e=t.map(r=>r.toLowerCase());let n=null,s=null;return i.traverse(r=>{if(n)return;const o=(r.name||"").toLowerCase();o&&(e.includes(o)?n=r:!s&&e.some(a=>o.includes(a))&&(s=r))}),n||s}function su(i,t){let e=i;for(;e;){if(e===t)return!0;e=e.parent}return!1}function Ge(i,t=0,e=0,n=0){!i||!t&&!e&&!n||i.quaternion.multiply(new To().setFromEuler(new Nc(t,e,n,"XYZ")))}function ru(i,t,e=!0){if(!i||!t)return null;const n=i.mixer.clipAction(t);return n.enabled=!0,n.setLoop(e?qc:Xc,e?1/0:1),n.clampWhenFinished=!e,n.play(),n}function by(i){const t={};for(const n of Uc){const s=iu(i.clips||[],nu[n]);t[n]=s?{clip:s,action:ru(i,s,!0)}:null}const e=iu(i.clips||[],nu.deathPose);t.deathPose=e?{clip:e,action:ru(i,e,!1)}:null,t.deathPose?.action&&(t.deathPose.action.paused=!0,t.deathPose.action.setEffectiveWeight(0));for(const n of Uc)t[n]?.action&&(t[n].action.paused=!0,t[n].action.setEffectiveWeight(0));return t}class wy{constructor(t){this.manager=t,this.listeners=new Map}on(t,e){return this.listeners.has(t)||this.listeners.set(t,new Set),this.listeners.get(t).add(e),()=>this.off(t,e)}off(t,e){this.listeners.get(t)?.delete(e)}emit(t,e={}){this.manager.eventCounts[t]=(this.manager.eventCounts[t]||0)+1;const n={type:t,time:Do(),...e};for(const s of this.listeners.get(t)||[])s(n);for(const s of this.listeners.get("*")||[])s(n);return n}}function Ty(i,t){const e=t._animationPolish;e?.model===i.model&&(i.restPosition.copy(e.restPosition),i.restQuaternion.copy(e.restQuaternion),i.restScale.copy(e.restScale)),i.model.position.copy(i.restPosition),i.model.quaternion.copy(i.restQuaternion),i.model.scale.copy(i.restScale)}function Ey(i,t){const e=t.root.position.y;Math.abs(e-i.logicalRootY)>.24&&(i.logicalRootY=e),t.root.position.y=i.logicalRootY}function Ay(i,t){const e=i.player,n=e.assetVisual,s=e.assetAnimator;if(!n||!s)return null;if(t.state?.model===n)return t.state;const r=e._animationPolish,o=r?.model===n?r.restPosition.clone():n.position.clone(),a=r?.model===n?r.restQuaternion.clone():n.quaternion.clone(),l=r?.model===n?r.restScale.clone():n.scale.clone();n.position.copy(o),n.quaternion.copy(a),n.scale.copy(l),n.updateMatrixWorld(!0);const c={model:n,animator:s,restPosition:o,restQuaternion:a,restScale:l,actions:by(s),bones:{hips:nn(n,["hips"]),spine:nn(n,["spine"]),chest:nn(n,["chest"]),head:nn(n,["head"]),upperLegL:nn(n,["upperleg.l"]),upperLegR:nn(n,["upperleg.r"]),lowerLegL:nn(n,["lowerleg.l"]),lowerLegR:nn(n,["lowerleg.r"]),footL:nn(n,["foot.l"]),footR:nn(n,["foot.r"]),toesL:nn(n,["toes.l"]),toesR:nn(n,["toes.r"])},cape:nn(n,["Knight_Cape","cape"]),hair:nn(n,["hair","ponytail","braid"]),capeRest:null,hairRest:null,gaitPhase:0,previousGaitPhase:0,gaitDistance:0,idleClock:0,lastSpeed:e.speed||0,lastFacing:e.facing||0,startElapsed:99,stopElapsed:99,turnElapsed:99,turnDirection:0,dodgeRecoveryElapsed:99,lastPlayerState:e.state,lastAttackSerial:t.attackSerial,lastAttackAction:null,comboCarry:null,trailActive:!1,footProbeElapsed:0,groundRefreshElapsed:99,groundMeshes:[],raycaster:new Pm,foot:{left:{bone:null,baseClearance:.08,groundY:t.logicalRootY,lock:null,hit:null},right:{bone:null,baseClearance:.08,groundY:t.logicalRootY,lock:null,hit:null}}};c.foot.left.bone=c.bones.footL,c.foot.right.bone=c.bones.footR,c.capeRest=c.cape?.quaternion.clone()||null,c.hairRest=c.hair?.quaternion.clone()||null;for(const h of[c.foot.left,c.foot.right]){if(!h.bone)continue;const u=h.bone.getWorldPosition(new xi);h.baseClearance=xn(u.y-e.root.position.y,.035,.32),h.groundY=e.root.position.y}return n.userData.rowanAuthoredDirector=!0,t.state=c,t.ready=!0,t.skeletalRigReady=!!(c.bones.hips&&c.bones.spine&&c.bones.footL&&c.bones.footR),t.secondaryMotionReady=!!(c.cape||c.hair),t.footIKReady=!!(c.bones.footL&&c.bones.footR),t.clipCoverage={idle:!!c.actions.idle,walk:!!c.actions.walk,run:!!c.actions.run,turnLeft:!!c.actions.turnLeft,turnRight:!!c.actions.turnRight,deathPose:!!c.actions.deathPose},c}function to(i,t,e,n=1){if(!i?.action||!i.clip)return;const s=i.action;s.enabled=t>1e-4,s.paused=!0,s.setEffectiveWeight(t),s.setEffectiveTimeScale(n),s.time=i.clip.duration*((e%1+1)%1)}function Ry(i){for(const t of Uc){const e=i.actions[t]?.action;e&&(e.setEffectiveWeight(0),e.paused=!0)}}function Cy(i,t,e,n,s,r){if(!Eo(e))return Ry(i),{weights:Qh(0),speed01:0,moving:!1,turnWeight:0};const o=e.speed||0,a=Sn(o/5.25),l=o>.12,c=o>1?xn(Math.abs(s)*.085+Math.max(0,1-i.turnElapsed/.24)*.44,0,.72):0,h=Qh(o,5.25,c);if(i.idleClock+=n,i.previousGaitPhase=i.gaitPhase,l){const T=jt.lerp(1.22,1.92,a);i.gaitDistance+=o*n,i.gaitPhase=i.gaitDistance/T%1}const u=s>=0,d=u?i.actions.turnRight:i.actions.turnLeft,f=u?i.actions.turnLeft:i.actions.turnRight,m=d?h.turn:0,_=d?1-h.turn:1,g=Math.max(1e-4,h.idle+h.walk+h.run),p=h.idle/g*_,v=h.walk/g*_,M=h.run/g*_,x=i.idleClock/Math.max(.001,i.actions.idle?.clip?.duration||2.4)%1;return to(i.actions.idle,p,x,1),to(i.actions.walk,v,i.gaitPhase,jt.lerp(.78,1.28,a)),to(i.actions.run,M,i.gaitPhase,jt.lerp(.78,1.14,a)),to(d,m,i.gaitPhase,1),f?.action&&f.action.setEffectiveWeight(0),i.animator.mixer.update(0),t.locomotionWeights={idle:p,walk:v,run:M,turn:m},t.locomotionBlendActive=!0,l&&o>.7&&(tu(i.previousGaitPhase,i.gaitPhase,Bd)&&t.events.emit("footstep",{foot:"left",speed:o,speed01:a,position:e.position.clone()}),tu(i.previousGaitPhase,i.gaitPhase,kd)&&t.events.emit("footstep",{foot:"right",speed:o,speed01:a,position:e.position.clone()})),{weights:t.locomotionWeights,speed01:a,moving:l,turnWeight:m,acceleration:r}}function Py(i,t,e,n,s,r){i.startElapsed+=n,i.stopElapsed+=n,i.turnElapsed+=n,i.dodgeRecoveryElapsed+=n;const o=e.speed||0,a=Eo(e)&&Eo(e,i.lastPlayerState);a&&i.lastSpeed<.32&&o>.58&&s>2.2&&(i.startElapsed=0,t.events.emit("locomotion:start",{speed:o,acceleration:s})),a&&i.lastSpeed>1.15&&o<.82&&s<-2.2&&(i.stopElapsed=0,t.events.emit("locomotion:stop",{speed:o,acceleration:s})),a&&o>1.35&&Math.abs(r)>3.9&&i.turnElapsed>.13&&(i.turnElapsed=0,i.turnDirection=Math.sign(r)||1,t.events.emit("locomotion:direction-change",{direction:i.turnDirection,turnRate:r,speed:o})),i.lastPlayerState==="dodge"&&e.state==="idle"&&(i.dodgeRecoveryElapsed=0,t.events.emit("dodge:recover",{position:e.position.clone()})),i.lastPlayerState==="attack"&&e.state!=="attack"&&(t.lastAttackEndedAt=Do(),i.trailActive&&(i.trailActive=!1,t.events.emit("weapon-trail:end",{combo:e.comboIndex,serial:t.attackSerial,interrupted:e.state!=="idle"}))),i.lastPlayerState=e.state}function Iy(i,t,e,n){if(!Eo(t))return;const s=i.bones,r=Qr(i.startElapsed,.25),o=Qr(i.stopElapsed,.28),a=Qr(i.turnElapsed,.23)*i.turnDirection,l=Qr(i.dodgeRecoveryElapsed,.23),c=Sn((t.speed||0)/5.25),h=xn(e*.0055,-.045,.045),u=xn(n*.018*c,-.075,.075);Ge(s.hips,-r*.075+o*.065-h*.45+l*.035,a*.035,-u*.4),Ge(s.spine,-r*.08+o*.09-h*.7+l*.045,a*.055,-u*.62),Ge(s.chest,-r*.055+o*.07-h*.55+l*.035,a*.07,-u*.75),Ge(s.head,r*.035-o*.045+h*.28-l*.025,-a*.035,u*.35),o>0&&(Ge(s.upperLegL,o*.045,0,0),Ge(s.upperLegR,o*.045,0,0),Ge(s.lowerLegL,-o*.07,0,0),Ge(s.lowerLegR,-o*.07,0,0))}function Ly(i,t,e){if(e.state!=="attack")return;const n=Sn(e.stateTime/Math.max(.01,e.stateDuration)),s=e.comboIndex||0,r=1-jt.smoothstep(n,.05,s===2?.35:.25),o=s===2?.38:.25,a=s===2?.73:.62,l=Math.sin(Math.PI*Sn((n-o)/Math.max(.01,a-o))),c=jt.smoothstep(n,a,.98),h=s===0?-1:s===1?1:-.45;Ge(i.bones.hips,r*.035-l*.035+c*.018,h*(-r*.08+l*.11),h*l*.018),Ge(i.bones.spine,r*.045-l*.065+c*.025,h*(-r*.12+l*.17),h*(-r*.025+l*.035)),Ge(i.bones.chest,r*.03-l*.075+c*.025,h*(-r*.14+l*.2),h*(-r*.035+l*.045)),Ge(i.bones.head,-r*.018+l*.03,h*(r*.05-l*.07),-h*l*.025),!t.followThroughSerials.has(t.attackSerial)&&n>=(s===2?.76:.66)&&(t.followThroughSerials.add(t.attackSerial),t.events.emit("attack:follow-through",{combo:s,serial:t.attackSerial,progress:n}));const u=n>=(s===2?.19:.13)&&n<=(s===2?.9:.86);u!==i.trailActive&&(i.trailActive=u,t.events.emit(u?"weapon-trail:start":"weapon-trail:end",{combo:s,serial:t.attackSerial}))}function Dy(i,t,e){if(e.state!=="hurt"||!t.hitResponse)return;const n=Sn(e.stateTime/Math.max(.01,e.stateDuration||.28)),s=Math.sin(Math.PI*n),{front:r,side:o}=t.hitResponse;Ge(i.bones.hips,r*.055*s,o*.03*s,-o*.055*s),Ge(i.bones.spine,r*.11*s,o*.055*s,-o*.11*s),Ge(i.bones.chest,r*.135*s,o*.07*s,-o*.145*s),Ge(i.bones.head,-r*.08*s,-o*.05*s,o*.1*s)}function Ny(i,t,e,n){if(i.lastAttackSerial!==t.attackSerial&&e.state==="attack"){const a=i.animator.action,l=i.lastAttackAction,c=Do()-t.lastAttackEndedAt;if(l&&a&&l!==a&&c<.2){l.enabled=!0,l.paused=!0;const h=l.getClip?.();h?.duration&&(l.time=Math.max(l.time,h.duration*.86)),i.comboCarry={action:l,current:a,elapsed:0,duration:.095}}i.lastAttackAction=a,i.lastAttackSerial=t.attackSerial}if(!i.comboCarry)return;const s=i.comboCarry;s.elapsed+=n;const r=Sn(s.elapsed/s.duration),o=(1-r)*.24;s.action.enabled=o>.001,s.action.setEffectiveWeight(o),s.current&&s.current.setEffectiveWeight(1-o),i.animator.mixer.update(0),r>=1&&(s.action.setEffectiveWeight(0),i.comboCarry=null)}function Uy(i,t,e){const n=i.actions.deathPose;if(!n?.action||e.state!=="dead"){n?.action&&n.action.setEffectiveWeight(0);return}if(e.stateTime<1.02)return;const s=n.action;s.enabled=!0,s.paused=!0,s.time=Math.max(0,n.clip.duration*.95),s.setEffectiveWeight(1),i.animator.action&&i.animator.action!==s&&i.animator.action.setEffectiveWeight(0),i.animator.mixer.update(0),t.deathPoseHeld=!0}function Fy(i,t,e,n,s,r){const o=Do();if(i.cape&&i.capeRest){const a=n*.22,l=xn(r*.008,-.045,.065),c=t.state==="attack"?Math.sin(Math.PI*Sn(t.stateTime/Math.max(.01,t.stateDuration)))*.045:0,h=Math.sin(o*7.2)*(.008+n*.018),u=xn(-s*.01,-.065,.065)+h,d=i.capeRest.clone().multiply(new To().setFromEuler(new Nc(.02+a+l+c,0,u,"XYZ")));i.cape.quaternion.slerp(d,1-Math.exp(-e*8.2))}if(i.hair&&i.hairRest&&i.hair!==i.cape){const a=Math.sin(o*9.4+.8)*(.006+n*.012),l=i.hairRest.clone().multiply(new To().setFromEuler(new Nc(-n*.035,0,xn(-s*.005,-.035,.035)+a,"XYZ")));i.hair.quaternion.slerp(l,1-Math.exp(-e*10.5))}}function Oy(i,t,e){i.groundMeshes.length=0,t.scene.traverse(n=>{!n.isMesh||!n.visible||!n.geometry||!n.receiveShadow&&!n.userData?.groundSurface||su(n,e.root)||t.enemies.some(r=>su(n,r.root))||/shadow|trail|ribbon|telegraph|damage/i.test(n.name||"")||(Array.isArray(n.material)?n.material:[n.material]).some(r=>r?.transparent&&(r.opacity??1)<.45)||i.groundMeshes.push(n)})}function ou(i,t,e,n){const s=n.bone;if(!s||!i.groundMeshes.length)return null;const o=s.getWorldPosition(new xi).clone();o.y+=.72,i.raycaster.set(o,new xi(0,-1,0)),i.raycaster.near=0,i.raycaster.far=1.55;const l=i.raycaster.intersectObjects(i.groundMeshes,!1).find(c=>c.point.y<=o.y+.01);return l?{y:l.point.y,point:l.point.clone(),object:l.object}:null}function au(i,t,e=1){if(!i?.parent||t.lengthSq()<1e-10)return;const n=i.parent.getWorldQuaternion(new To).invert(),s=t.clone().applyQuaternion(n).multiplyScalar(e);i.position.add(s)}function By(i,t,e,n,s){if(!t.footIKReady)return;if(n.state==="dodge"||n.state==="dead"){for(const d of[i.foot.left,i.foot.right])d.lock=null,d.hit=null;t.footIKActive=!1;return}i.groundRefreshElapsed+=s,i.footProbeElapsed+=s,i.groundRefreshElapsed>1&&(i.groundRefreshElapsed=0,Oy(i,e,n),t.groundMeshCount=i.groundMeshes.length);const r=i.groundMeshes.length>260?.085:.05;i.footProbeElapsed>=r&&(i.footProbeElapsed%=r,i.model.updateMatrixWorld(!0),i.foot.left.hit=ou(i,e,n,i.foot.left),i.foot.right.hit=ou(i,e,n,i.foot.right));const o=n.speed>.28&&!["attack","hurt","cast"].includes(n.state),a=o?eu(i.gaitPhase,Bd):1,l=o?eu(i.gaitPhase,kd):1,c=[[i.foot.left,a,"left"],[i.foot.right,l,"right"]];let h=new xi,u=0;i.model.updateMatrixWorld(!0);for(const[d,f,m]of c){const _=d.bone;if(!_)continue;const g=d.hit,p=_.getWorldPosition(new xi);if(g){d.groundY=yy(d.groundY,g.y,18,s);const v=d.groundY+d.baseClearance,M=xn(v-p.y,-.11,.13);au(_,new xi(0,M,0),xn(f*.9,.2,.9))}if(!o){d.lock=null;continue}if(f>.78&&!d.lock){const v=g?.point?.clone()||p.clone();d.lock=new xi(v.x,p.y,v.z),t.events.emit("foot-lock",{foot:m,position:d.lock.clone()})}else f<.2&&(d.lock=null);if(d.lock&&f>.25){const v=_.getWorldPosition(new xi),M=d.lock.clone().sub(v);M.y=0;const x=.045;M.x=xn(M.x,-x,x),M.z=xn(M.z,-x,x),h.addScaledVector(M,f),u+=f}}u>.001&&i.bones.hips&&(h.multiplyScalar(1/u),au(i.bones.hips,h,.72)),t.footIKActive=!!(i.foot.left.hit||i.foot.right.hit),t.footProbeHz=Math.round(1/r)}function ky(i){const t=i._animationPolish;if(!t?.ribbon||i.state!=="attack")return;const e=Sn(i.stateTime/Math.max(.01,i.stateDuration));i.root.visible&&e>.13&&e<.88&&(t.ribbon.samples.length&&t.ribbon.samples.pop(),t.ribbon.update(0,t.sword,!0,i.comboIndex,i.comboIndex===2?1.35:1))}function zy(i,t,e){const n=i.player,s=Ay(i,t);if(!s)return;Ey(t,n),Ty(s,n);const r=n.speed||0,o=e>1e-4?xn((r-s.lastSpeed)/e,-24,24):0,a=e>1e-4?Od(n.facing-s.lastFacing)/e:0;Py(s,t,n,e,o,a);const l=Cy(s,t,n,e,a,o);Ny(s,t,n,e),Iy(s,n,o,a),Ly(s,t,n),Dy(s,t,n),Uy(s,t,n),Fy(s,n,e,l.speed01||Sn(r/5.25),a,o),s.model.updateMatrixWorld(!0),By(s,t,i,n,e),s.model.updateMatrixWorld(!0),ky(n),s.lastSpeed=r,s.lastFacing=n.facing,t.acceleration=o,t.turnRate=a,t.rootProceduralSuppressed=!0,t.actionPoseIsolation=!0,t.comboCarryOrdered=!0}function Hy(i,t){const e=i.player,n=e.beginAttack.bind(e);e.beginAttack=l=>{const c=n(l);return c&&(t.attackSerial++,t.followThroughSerials.delete(t.attackSerial),t.events.emit("attack:anticipation",{combo:e.comboIndex,serial:t.attackSerial})),c};const s=e.attackWindow.bind(e);e.attackWindow=()=>{const l=s();return l&&t.events.emit("attack:strike",{combo:e.comboIndex,serial:t.attackSerial,position:e.position.clone()}),l};const r=e.takeDamage.bind(e);e.takeDamage=(l,c)=>{const h=c?My(e.facing,c.x,c.z,e.position.x,e.position.z):{front:1,side:0,angle:0},u=r(l,c);return u&&(t.hitResponse=h,t.events.emit("hit-reaction",{...h,amount:l,lethal:e.dead})),u};const o=e.beginDodge.bind(e);e.beginDodge=l=>{const c=o(l);return c&&t.events.emit("dodge:start",{direction:e.dodgeDir.clone(),position:e.position.clone()}),c};const a=i._resolveMelee.bind(i);i._resolveMelee=(...l)=>{const c=new Map(i.enemies.map(d=>[d,d.hp])),h=a(...l),u=i.enemies.filter(d=>c.has(d)&&d.hp<c.get(d));return u.length&&t.events.emit("sword:impact",{combo:e.comboIndex,serial:t.attackSerial,targets:u,position:e.position.clone()}),h}}function Vy(i,t){const e=i.player;t.events.on("footstep",n=>{const s=.014+n.speed01*.012,r=n.foot==="left"?620:710;e.audio?.noise?.(.028,s,r)}),t.events.on("attack:strike",n=>{e.audio?.noise?.(.035,n.combo===2?.035:.024,n.combo===2?1450:1750)}),t.events.on("weapon-trail:start",()=>{t.weaponTrailEventActive=!0}),t.events.on("weapon-trail:end",()=>{t.weaponTrailEventActive=!1}),t.events.on("sword:impact",n=>{t.lastImpactCount=n.targets.length})}function Gy(i){const t={ready:!1,state:null,mode:"skeletal-follow-gameplay",logicalRootY:i.player.root.position.y,attackSerial:0,lastAttackEndedAt:-999,followThroughSerials:new Set,hitResponse:null,eventCounts:{},locomotionWeights:{idle:1,walk:0,run:0,turn:0},locomotionBlendActive:!1,skeletalRigReady:!1,secondaryMotionReady:!1,footIKReady:!1,footIKActive:!1,rootProceduralSuppressed:!1,deathPoseHeld:!1,weaponTrailEventActive:!1,lastImpactCount:0,actionPoseIsolation:!1,comboCarryOrdered:!1};t.events=new wy(t),i.rowanAnimationDirector=t,i.rowanAnimationEvents=t.events,Hy(i,t),Vy(i,t);const e=i.player.update.bind(i.player);return i.player.update=(...n)=>{const s=e(...n);return zy(i,t,n[0]||0),s},t}const Wy=R,Xy=jt.clamp;function cu(i=""){return String(i).toLowerCase().replace(/[^a-z0-9]/g,"")}function lu(i,t){if(!i)return null;const e=t.map(cu);let n=null,s=null;return i.traverse(r=>{if(n)return;const o=cu(r.name);o&&(e.includes(o)?n=r:!s&&e.some(a=>o.includes(a))&&(s=r))}),n||s}function hu(i,t,e){i.bone=t;const n=t.getWorldPosition(new Wy);i.baseClearance=Xy(n.y-e.root.position.y,.035,.32),i.groundY=e.root.position.y,i.lock=null,i.hit=null}function qy(i,t){const e=i.player,n=e.update.bind(e);let s=null;return e.update=(...r)=>{const o=n(...r),a=t?.state;if(a?.model&&a.model!==s&&!t.footIKReady){const l=a.bones.footL||lu(a.model,["foot.l","foot_l","footl","leftfoot","lfoot","leftankle"]),c=a.bones.footR||lu(a.model,["foot.r","foot_r","footr","rightfoot","rfoot","rightankle"]);l&&c&&(a.bones.footL=l,a.bones.footR=c,hu(a.foot.left,l,e),hu(a.foot.right,c,e),t.footIKReady=!0,t.skeletalRigReady=!!(a.bones.hips&&a.bones.spine&&l&&c),s=a.model,console.info("[Rowan rig compatibility] resolved imported foot bones",{left:l.name,right:c.name}))}return o},t}const eo=.42,Ky=new Set(["attack","dodge","hurt","cast","dead"]),no={start:.25,stop:.28,turn:.23,dodgeRecovery:.23};function La(i,t=i?.state){return!!(i&&!i.dead&&!Ky.has(t))}function uu(i){const t=i.state?.foot;for(const e of[t?.left,t?.right])e&&(e.lock=null,e.hit=null);i.footIKActive=!1}function du(i){const t=i.state?.comboCarry;t&&(t.action?.stopFading?.(),t.current?.stopFading?.(),t.action?.setEffectiveWeight?.(0),t.current&&t.current.setEffectiveWeight(1),i.state.comboCarry=null,i.comboCarryInterrupted=!0)}function fu(i){const t=i.state?.animator;if(!t||t.__rowanComboFadeGuard)return;t.__rowanComboFadeGuard=!0;const e=t.play.bind(t);t.play=(n,s)=>{const r=t.action,o=e(n,s);return o&&/^attack/.test(n||"")&&(i.state?.lastAttackAction?.stopFading?.(),r?.stopFading?.(),o.stopFading?.()),o}}function gs(i,t){const e=i.state;e&&(t==="locomotion:start"?e.startElapsed=no.start:t==="locomotion:stop"?e.stopElapsed=no.stop:t==="locomotion:direction-change"?e.turnElapsed=no.turn:t==="dodge:recover"&&(e.dodgeRecoveryElapsed=no.dodgeRecovery))}function Yy(i){gs(i,"locomotion:start"),gs(i,"locomotion:stop"),gs(i,"locomotion:direction-change")}function jy(i,t){if(!i?.player||!t?.events)return t;let e=null,n=0,s=-1/0;const r=t.events.emit.bind(t.events);t.events.emit=(a,l={})=>{const c=La(i.player),h=e?.startedInLocomotion??c;if(["locomotion:start","locomotion:stop","locomotion:direction-change"].includes(a)&&(!c||!h))return gs(t,a),{type:a,suppressed:!0,...l};if(a==="dodge:recover"&&i.player.state!=="idle")return gs(t,a),{type:a,suppressed:!0,...l};if(a==="attack:anticipation"&&Number.isFinite(s)){const u=Math.max(0,n-s);t.lastAttackEndedAt=performance.now()*.001-u,t.comboCarrySimulationGap=u}return r(a,l)};const o=i.player.update.bind(i.player);return i.player.update=(...a)=>{const l=Math.max(1e-4,a[0]||0);n+=l;const c=i.player.speed||0,h=i.player.state,u=La(i.player,h),d=t.eventCounts["locomotion:start"]||0,f=t.eventCounts["locomotion:stop"]||0;fu(t),h!=="attack"&&du(t),h==="dodge"&&uu(t),e={previousState:h,startedInLocomotion:u};let m;try{m=o(...a)}finally{e=null}const _=i.player.state,g=i.player.speed||0,p=(g-c)/l,v=t.state,M=u&&La(i.player,_);return fu(t),h==="attack"&&_!=="attack"&&(s=n),(_==="dodge"||h==="dodge")&&uu(t),_!=="attack"&&du(t),v&&!M?(Yy(t),h==="dodge"&&_!=="idle"&&gs(t,"dodge:recover"),m):(v&&(t.eventCounts["locomotion:start"]||0)===d&&c<=eo&&g>eo&&p>0&&(v.startElapsed=0,t.events.emit("locomotion:start",{speed:g,acceleration:p,frameInvariant:!0})),v&&(t.eventCounts["locomotion:stop"]||0)===f&&c>=eo&&g<eo&&p<0&&(v.stopElapsed=0,t.events.emit("locomotion:stop",{speed:g,acceleration:p,frameInvariant:!0})),m)},t.frameInvariantTransitions=!0,t.transitionStateIsolation=!0,t.authoredActionPoseFinal=!0,t.comboCarryUsesSimulationTime=!0,t.comboCarryFadeGuard=!0,t}function $y(i=2402394823,t=128){const e=document.createElement("canvas");e.width=e.height=t;const n=e.getContext("2d"),s=n.createImageData(t,t);let r=i|0;const o=()=>(r^=r<<13,r^=r>>>17,r^=r<<5,(r>>>0)/4294967295);for(let l=0;l<t;l++)for(let c=0;c<t;c++){const h=(l*t+c)*4,u=Math.sin(c*.19)*7+Math.cos(l*.16)*6,d=(o()-.5)*28,f=Math.max(96,Math.min(232,164+u+d));s.data[h]=f,s.data[h+1]=f,s.data[h+2]=f,s.data[h+3]=255}n.putImageData(s,0,0);const a=new cd(e);return a.wrapS=a.wrapT=Hi,a.repeat.set(3.5,3.5),a.colorSpace=ei,a.minFilter=kn,a.magFilter=rn,a.generateMipmaps=!0,a}function Jy(i){const t=i?.water?.material;if(!t?.isShaderMaterial)return;const e="smoothstep(0.0,.2,vUv.y)*smoothstep(1.0,.8,vUv.y)",n="smoothstep(0.0,.2,vUv.y)*(1.0-smoothstep(.8,1.0,vUv.y))";t.fragmentShader.includes(e)&&(t.fragmentShader=t.fragmentShader.replace(e,n),t.needsUpdate=!0)}function Zy(i,t){if(!t?.root)return;const e=$y();e.anisotropy=Math.min(4,i.renderer.capabilities.getMaxAnisotropy?.()||1);const n=new Set;t.root.traverse(s=>{if(!s.isMesh||s===t.water)return;const r=Array.isArray(s.material)?s.material:[s.material];for(const o of r)!o?.isMeshStandardMaterial||n.has(o)||(n.add(o),(o.roughness??0)>=.9&&(o.bumpMap=e,o.bumpScale=.028,o.roughnessMap=e,o.needsUpdate=!0))}),t.detailTexture=e}function Qy(i,t){i.quality==="low"&&(i.scene.traverse(e=>{e.isDirectionalLight&&e.castShadow&&(e.shadow.mapSize.set(1024,1024),e.shadow.needsUpdate=!0)}),t.foam?.forEach((e,n)=>{n%2&&(e.visible=!1)}),t.root?.traverse(e=>{e.isMesh&&(e.userData?.showcaseMote&&Math.abs(e.userData.phase||0)%2>1&&(e.visible=!1),e.name==="Showcase_Cliff"&&(e.castShadow=!1))}))}function tS(i){let t=!1,e=0;const n=()=>{if(t)return;const s=i.natureAssetManager;if(!s?.ready){e++<900&&requestAnimationFrame(n);return}const r=i.world.update.bind(i.world);let o=0;i.world.update=a=>{r(a),o+=a;const l=.45+.55*(Math.sin(o*.37)*.5+.5);for(let c=0;c<s.instances.length;c++){const h=s.instances[c],u=h.userData.kind,d=h.userData.phase||c*.73,f=u==="pine"?.0045:u==="grass"?.017:.01;h.rotation.z+=Math.sin(o*2.6+d*1.9)*f*l}},i.showcaseNatureWindReady=!0};return requestAnimationFrame(n),()=>{t=!0}}function eS(i){const t=i.showcasePass;if(!t||i.showcaseQualityGate)return i.showcaseQualityGate;Jy(t),Zy(i,t),Qy(i,t);const e=tS(i),n={waterShaderSafe:!0,surfaceDetail:!!t.detailTexture,cancelNatureWind:e};return i.showcaseQualityGate=n,n}const cs=Object.freeze([]),pu=new Rt,mu=new Rt,gu=new ur;function En(i){return i?.uuid||""}function _u(i){return i?.isColor?i.getHexString():""}function nS(i){return!i||Array.isArray(i)||i.visible===!1||i.transparent||i.opacity<.999||i.blending!==yi||!i.isMeshStandardMaterial&&!i.isMeshBasicMaterial&&!i.isMeshLambertMaterial&&!i.isMeshPhongMaterial?null:[i.type,_u(i.color),_u(i.emissive),i.emissiveIntensity??"",i.roughness??"",i.metalness??"",i.side,i.flatShading?1:0,i.vertexColors?1:0,i.alphaTest??0,i.depthTest?1:0,i.depthWrite?1:0,i.toneMapped?1:0,i.fog?1:0,i.wireframe?1:0,i.polygonOffset?1:0,i.polygonOffsetFactor??0,i.polygonOffsetUnits??0,En(i.map),En(i.normalMap),En(i.roughnessMap),En(i.metalnessMap),En(i.aoMap),En(i.emissiveMap),En(i.alphaMap),En(i.bumpMap),i.bumpScale??"",En(i.displacementMap),En(i.lightMap),En(i.envMap)].join("|")}function iS(i){return!i||i.morphAttributes&&Object.values(i.morphAttributes).some(t=>t?.length)?null:i.parameters?`${i.type}:${JSON.stringify(i.parameters)}`:`uuid:${i.uuid}`}function sS(i,t,e){if(i.isSkinnedMesh||i.isInstancedMesh||!i.visible||i.userData?.showcaseMote||i.userData?.assetNature)return!0;const n=t.world.decor;for(let s=i;s&&s!==n;s=s.parent)if(!s.visible||e.has(s)||s.userData?.assetNature)return!0;return!1}function rS(i){const t=new Set,e=i.world,n=i.showcasePass;e.portal&&t.add(e.portal);for(const s of e.fireflies||cs)t.add(s);n?.water&&t.add(n.water);for(const s of n?.foam||cs)t.add(s);for(const s of n?.swayGroups||cs)t.add(s);for(const s of n?.dynamicShadows?.values?.()||cs)t.add(s);for(const s of i.natureAssetManager?.instances||cs)t.add(s);return t}function oS(i,t,e){const n=i.world.decor,s=rS(i),r=new Map;n.updateMatrixWorld(!0),pu.copy(n.matrixWorld).invert(),n.traverse(c=>{if(!c.isMesh||sS(c,i,s)||c.castShadow)return;const h=iS(c.geometry),u=nS(c.material);if(!h||!u)return;const d=[h,u,c.castShadow?1:0,c.receiveShadow?1:0,c.renderOrder||0,c.layers.mask].join("::"),f=new Rt().multiplyMatrices(pu,c.matrixWorld);r.has(d)||r.set(d,[]),r.get(d).push({mesh:c,matrix:f,alwaysVisible:c.frustumCulled===!1})});let o=0,a=0,l=0;for(const c of r.values()){if(c.length<3)continue;const h=c[0].mesh,u=new tl(h.geometry,h.material,c.length);u.name=`PerformanceBatch_${h.geometry.type}_${c.length}`,u.castShadow=h.castShadow,u.receiveShadow=h.receiveShadow,u.renderOrder=h.renderOrder,u.layers.mask=h.layers.mask,u.frustumCulled=!1,u.instanceMatrix.setUsage(Df);for(let d=0;d<c.length;d++)u.setMatrixAt(d,c[d].matrix);u.instanceMatrix.needsUpdate=!0,n.add(u);for(const{mesh:d}of c)d.visible=!1;e.push({batch:u,entries:c,visible:new Int32Array(c.length),scratchVisible:new Int32Array(c.length),visibleCount:-1}),o+=c.length,a++,l+=c.length-1}return t.rebatches++,t.batchedMeshes+=o,t.instancedBatches+=a,t.estimatedDrawCallsSaved+=l,{batchedMeshes:o,batches:a,savedDrawCalls:l}}function aS(i,t,e){if(!t.length)return;mu.multiplyMatrices(i.camera.projectionMatrix,i.camera.matrixWorldInverse),gu.setFromProjectionMatrix(mu);let n=0,s=0;for(const r of t){const{batch:o,entries:a}=r,l=r.scratchVisible;let c=0;for(let u=0;u<a.length;u++){const d=a[u];(d.alwaysVisible||gu.intersectsObject(d.mesh))&&(l[c++]=u)}let h=c!==r.visibleCount;if(!h){for(let u=0;u<c;u++)if(l[u]!==r.visible[u]){h=!0;break}}if(h){for(let d=0;d<c;d++)o.setMatrixAt(d,a[l[d]].matrix);o.count=c,o.visible=c>0,c>0&&(o.instanceMatrix.needsUpdate=!0);const u=r.visible;r.visible=r.scratchVisible,r.scratchVisible=u,r.visibleCount=c,e.staticCullUpdates++}n+=c,s+=a.length-c}e.staticCullFrames++,e.staticVisibleInstances=n,e.staticCulledInstances=s}function cS(i,t){const e=Object.create(null);i._updateHUD=()=>{const n=i.player,s=n.hp/n.maxHp,r=`${Math.ceil(n.hp)} / ${n.maxHp}`,o=n.mana/n.maxMana,a=n.xp/n.xpToLevel,l=`Lv. ${n.level}`,c=i.combatCombo<2||i.combatComboTimer<=0;e.hpScale!==s&&(e.hpScale=s,i.ui.hpFill.style.transform=`scaleX(${s})`),e.hpText!==r&&(e.hpText=r,i.ui.hpText.textContent=r),e.manaScale!==o&&(e.manaScale=o,i.ui.manaFill.style.transform=`scaleX(${o})`),e.xpScale!==a&&(e.xpScale=a,i.ui.xpFill.style.transform=`scaleX(${a})`),e.levelText!==l&&(e.levelText=l,i.ui.level.textContent=l),e.comboHidden!==c&&(e.comboHidden=c,i.ui.combo.classList.toggle("hidden",c)),t.hudFrames++}}function lS(i){const t=new R,e=new R;i._moveVector=n=>(t.set(Math.sin(i.cameraYaw),0,Math.cos(i.cameraYaw)).multiplyScalar(n.y),e.set(Math.cos(i.cameraYaw),0,-Math.sin(i.cameraYaw)).multiplyScalar(n.x),t.add(e)),i._updateEncounter=n=>{if(i.kills<i.objectiveKills&&!i.bossPending){let s=0;for(const o of i.enemies)!o.dead&&!o.isBoss&&s++;const r=i.kills+s;(s<4&&r<i.objectiveKills||s<4&&i.kills<i.objectiveKills)&&i._spawnEnemy()}i.bossPending&&(i.bossTimer-=n,i.bossTimer<=0&&i._spawnBoss()),i.boss&&!i.boss.dead&&(i.ui.bossFill.style.transform=`scaleX(${i.boss.hp/i.boss.maxHp})`),i.victoryTimer>0&&(i.victoryTimer-=n,i.victoryTimer<=0&&!i.victoryShown&&(i.victoryShown=!0,i.ui.victory.classList.remove("hidden"),document.exitPointerLock?.()))}}function hS(i,t){const e=i.showcasePass;if(!e?.root||e._performanceWrapped)return;e._performanceWrapped=!0;const n=[];e.root.traverse(o=>{o.userData?.showcaseMote&&n.push(o)});const s=e.update.bind(e),r=e.root.traverse;e.update=o=>{const a=i.natureAssetManager,l=a?.instances,c=e.root.traverse;a?.instances?.length&&(a.instances=cs),e.root.traverse=h=>{for(const u of n)h(u)};try{s(o),t.showcaseFrames++}finally{e.root.traverse=c||r,a&&l&&(a.instances=l)}}}function uS(i){if(i.performancePass)return i.performancePass;const t={rebatches:0,batchedMeshes:0,instancedBatches:0,estimatedDrawCallsSaved:0,hudFrames:0,showcaseFrames:0,staticCullFrames:0,staticCullUpdates:0,staticVisibleInstances:0,staticCulledInstances:0},e=[];cS(i,t),lS(i),hS(i,t);const n=i.scene.onBeforeRender;i.scene.onBeforeRender=function(...r){n?.apply(this,r),aS(i,e,t)};const s={stats:t,staticBatches:e,rebatch(){const r=oS(i,t,e);return console.info("[Maples performance]",r,t),r}};return i.performancePass=s,s.rebatch(),s}const Ys=Object.freeze([]);function dS(i){const t=new Set,e=i.world,n=i.showcasePass;e.portal&&t.add(e.portal);for(const s of e.fireflies||Ys)t.add(s);n?.root&&t.add(n.root),n?.water&&t.add(n.water);for(const s of n?.foam||Ys)t.add(s);for(const s of n?.swayGroups||Ys)t.add(s);for(const s of n?.dynamicShadows?.values?.()||Ys)t.add(s);for(const s of i.natureAssetManager?.instances||Ys)t.add(s);return t}function fS(i,t,e){for(let n=i;n&&n!==t;n=n.parent)if(e.has(n)||n.userData?.assetNature||n.userData?.showcaseMote)return!0;return!1}function pS(i,t){const e=i.world.decor,n=dS(i);e.updateMatrixWorld(!0);let s=0;return e.traverse(r=>{r===e||fS(r,e,n)||r.isSkinnedMesh||r.isBone||(r.matrixAutoUpdate=!1,r.matrixWorldAutoUpdate=!1,s++)}),t.frozenStaticObjects=s,s}function mS(i,t){const e=new R,n=new R,s=new R;i._updateProjectiles=r=>{for(let o=i.projectiles.length-1;o>=0;o--){const a=i.projectiles[o];a.life-=r,a.mesh.position.addScaledVector(a.velocity,r),a.mesh.rotation.x+=r*8,a.mesh.rotation.y+=r*11,i.fx.projectileTrail(a.mesh.position);let l=!1;for(const c of i.enemies){if(c.dead||a.hits.has(c))continue;const h=c.radius+.45;if(e.copy(c.position),e.y+=c.isBoss?1.6:.75,a.mesh.position.distanceTo(e)<h){a.hits.add(c),a.pierce--;const u=Math.random()<.16,d=Math.round(42*(u?1.55:1));if(c.takeHit(d,i.player.position,u),n.copy(c.position),n.y+=c.isBoss?2.8:1.45,i._damageNumber(n,d,u),i._addCombatCombo(),i.fx.burst(a.mesh.position,16747093,24,5.5,1),i.fx.ring(c.position,16744788,.18,2.2,.3),i.cameraShake=Math.max(i.cameraShake,.38),i.hitStop=.055,a.pierce<=0){l=!0;break}}}(a.life<=0||l)&&(i.scene.remove(a.mesh),a.mesh.geometry.dispose(),a.mesh.material.dispose(),i.projectiles.splice(o,1))}t.projectileFrames++},i._updatePickups=r=>{for(let o=i.pickups.length-1;o>=0;o--){const a=i.pickups[o];a.age+=r,a.mesh.rotation.y+=r*5,a.mesh.position.y+=Math.sin(a.age*4+a.phase)*r*.12,s.copy(i.player.position),s.y+=.8,s.sub(a.mesh.position);const l=s.length();if(a.age>.35&&l<6&&a.mesh.position.addScaledVector(s.normalize(),r*(4+Math.max(0,6-l)*2.4)),l<.55){const c=i.player.addXp(a.value);i.player.hp=Math.min(i.player.maxHp,i.player.hp+1.8),i.player.mana=Math.min(i.player.maxMana,i.player.mana+2.5),i.audio.pickup(),c&&i.toast(`LEVEL ${i.player.level}`,1.4),i.scene.remove(a.mesh),a.mesh.geometry.dispose(),a.mesh.material.dispose(),i.pickups.splice(o,1)}}t.pickupFrames++}}function gS(i){if(i.performanceExtensions)return i.performanceExtensions;const t={projectileFrames:0,pickupFrames:0,frozenStaticObjects:0};mS(i,t);const e={stats:t,freezeStaticDecor(){if(t.frozenStaticObjects)return t.frozenStaticObjects;const n=pS(i,t);return console.info("[Maples performance extensions]",{frozenStaticObjects:n},t),n}};return i.performanceExtensions=e,e}const vu=new Rt,Da=new Rt,xu=new Rt,Mu=new Rt,yu=new ur,Su=new Nn;function _S(i){if(!i?.isMesh||i.isSkinnedMesh||i.isInstancedMesh||!i.visible||!i.geometry||i.geometry.morphAttributes&&Object.values(i.geometry.morphAttributes).some(e=>e?.length))return!1;const t=i.material;return!(!t||Array.isArray(t)||t.visible===!1||t.transparent||t.opacity<.999||t.blending!==yi)}function vS(i){i.updateMatrixWorld(!0),vu.copy(i.matrixWorld).invert();const t=[];return i.traverse(e=>{_S(e)&&(e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),t.push({mesh:e,geometry:e.geometry,material:e.material,relative:new Rt().multiplyMatrices(vu,e.matrixWorld),localSphere:e.geometry.boundingSphere?.clone()||null,castShadow:e.castShadow,receiveShadow:e.receiveShadow,renderOrder:e.renderOrder,layers:e.layers.mask,alwaysVisible:e.frustumCulled===!1}))}),t}function xS(i,t){return!!(i&&t&&i.geometry===t.geometry&&i.material===t.material&&i.renderOrder===t.renderOrder&&i.layers===t.layers)}function bu(i,t=null){const{batch:e,entries:n}=i;let s=0;for(let r=0;r<n.length;r++){const{root:o,relative:a,localSphere:l,alwaysVisible:c}=n[r];Da.multiplyMatrices(o.matrix,a),!(t&&!c&&l&&(Su.copy(l).applyMatrix4(Da),!t.intersectsSphere(Su)))&&e.setMatrixAt(s++,Da)}return e.count=s,e.visible=s>0,s>0&&(e.instanceMatrix.needsUpdate=!0),s}async function MS(i){if(i.natureInstancingManager)return i.natureInstancingManager;const t=i.natureAssetManager,e=i.natureInstancingManager={ready:!1,batches:[],roots:[],sourceMeshesHidden:0,estimatedDrawCallsSaved:0,skippedSlots:0,visibleInstances:0,culledInstances:0,sync(){if(!e.batches.length)return;for(const l of e.roots)l.updateMatrix();const r=i.world.decor;r.updateWorldMatrix(!0,!1),i.camera.updateWorldMatrix(!0,!1),xu.multiplyMatrices(i.camera.matrixWorldInverse,r.matrixWorld),Mu.multiplyMatrices(i.camera.projectionMatrix,xu),yu.setFromProjectionMatrix(Mu);let o=0,a=0;for(const l of e.batches)a+=l.entries.length,o+=bu(l,yu);e.visibleInstances=o,e.culledInstances=a-o}};if(!t?.ready||!t.instances?.length)return e.ready=!0,e;await new Promise(r=>requestAnimationFrame(r));const n=i.world.decor,s=new Map;e.roots=[...t.instances];for(const r of e.roots){const o=r.userData.kind||"nature";s.has(o)||s.set(o,[]),s.get(o).push(r)}for(const[r,o]of s){const a=o.map(vS),l=Math.max(0,...a.map(c=>c.length));for(let c=0;c<l;c++){const h=a[0]?.[c];if(!h){e.skippedSlots++;continue}const u=new Map;let d=!0;for(let f=0;f<o.length;f++){const m=a[f]?.[c];if(!xS(h,m)){d=!1;break}const _=`${m.castShadow?1:0}|${m.receiveShadow?1:0}`;u.has(_)||u.set(_,[]),u.get(_).push({root:o[f],slot:m})}if(!d){e.skippedSlots++;continue}for(const f of u.values()){if(f.length<2)continue;const m=f[0].slot;if(m.castShadow)continue;const _=new tl(m.geometry,m.material,f.length);_.name=`PerformanceNature_${r}_${c}_${f.length}`,_.castShadow=!1,_.receiveShadow=m.receiveShadow,_.renderOrder=m.renderOrder,_.layers.mask=m.layers,_.frustumCulled=!1,_.instanceMatrix.setUsage(Nf),_.userData.performanceNatureBatch=!0,n.add(_);const g={batch:_,entries:f.map(({root:p,slot:v})=>({root:p,relative:v.relative,localSphere:v.localSphere,alwaysVisible:v.alwaysVisible}))};for(const p of o)p.updateMatrix();bu(g),e.batches.push(g);for(const{slot:p}of f)p.mesh.visible=!1,e.sourceMeshesHidden++;e.estimatedDrawCallsSaved+=f.length-1}}}if(e.batches.length){const r=i.scene.onBeforeRender;i.scene.onBeforeRender=function(...o){r?.apply(this,o),e.sync()}}return e.ready=!0,console.info("[Maples nature instancing]",{batches:e.batches.length,sourceMeshesHidden:e.sourceMeshesHidden,estimatedDrawCallsSaved:e.estimatedDrawCallsSaved,skippedSlots:e.skippedSlots}),e}const Ni=()=>globalThis.performance?.now?.()??Date.now();function yS(i,t){return Math.atan2(Math.sin(t-i),Math.cos(t-i))}function Na(i,t){return Math.atan2(t.x-i.x,t.z-i.z)}function wu(i,t,e,{maxRange:n=5,coneCos:s=-.1}={}){const r=Math.sin(t),o=Math.cos(t);let a=null,l=1/0;for(const c of e||[]){if(!c||c.dead||c.remove||!c.position)continue;const h=c.position.x-i.x,u=c.position.z-i.z,d=Math.hypot(h,u);if(d<.001||d>n)continue;const f=(h*r+u*o)/d;if(f<s)continue;const m=d+(1-f)*2.4-(c.isBoss?.2:0);m<l&&(a=c,l=m)}return a}function SS({coarse:i,touchPoints:t,width:e}){return!!(i||t>0&&e<=760)}function bS(i){if(i.mobileCameraControls)return i.mobileCameraControls;const t=globalThis.matchMedia?.("(pointer: coarse)")?.matches??!1,e=globalThis.navigator?.maxTouchPoints||0,n=SS({coarse:t,touchPoints:e,width:globalThis.innerWidth||0}),s=i.mobileCameraControls={enabled:n,focusTarget:null,focusUntil:0,lastLookAt:-1/0,canvasLookActive:!1,actionPointers:new Map,attackPointers:new Set,nextHeldAttackAt:0};if(!n)return s;const{input:r,player:o,canvas:a}=i,l=r.consumeLook.bind(r);r.consumeLook=()=>{const v=l();return Math.abs(v.x)+Math.abs(v.y)>.01&&(s.lastLookAt=Ni()),{x:v.x*.74,y:v.y*.74}};const c=v=>{s.canvasLookActive=[...v].some(M=>M.clientX>innerWidth*.35),s.canvasLookActive&&(s.lastLookAt=Ni())};a.addEventListener("touchstart",v=>c(v.touches),{passive:!0}),a.addEventListener("touchmove",v=>c(v.touches),{passive:!0}),a.addEventListener("touchend",v=>c(v.touches),{passive:!0}),a.addEventListener("touchcancel",v=>c(v.touches),{passive:!0});const h=[...document.querySelectorAll(".mobile-actions button")];for(const v of h){v.addEventListener("pointerdown",x=>{v.setPointerCapture?.(x.pointerId),s.actionPointers.set(x.pointerId,{x:x.clientX,y:x.clientY,startX:x.clientX,startY:x.clientY,dragging:!1}),v.dataset.action==="attack"&&(s.attackPointers.add(x.pointerId),s.nextHeldAttackAt=Ni()+235)}),v.addEventListener("pointermove",x=>{const T=s.actionPointers.get(x.pointerId);if(!T)return;const E=x.clientX-T.x,C=x.clientY-T.y;T.x=x.clientX,T.y=x.clientY,!T.dragging&&Math.hypot(x.clientX-T.startX,x.clientY-T.startY)>=4&&(T.dragging=!0),T.dragging&&(r.mouseDX+=E*.9,r.mouseDY+=C*.9,s.lastLookAt=Ni())});const M=x=>{s.actionPointers.delete(x.pointerId),s.attackPointers.delete(x.pointerId)};v.addEventListener("pointerup",M),v.addEventListener("pointercancel",M)}const u=r.consume.bind(r);r.consume=v=>{const M=u(v);if(v!=="attack")return M;const x=s.attackPointers.size>0,T=Ni();return M?(x&&(s.nextHeldAttackAt=T+205),!0):x&&T>=s.nextHeldAttackAt?(s.nextHeldAttackAt=T+145,!0):!1};const d=(v,M)=>{v&&(s.focusTarget=v,s.focusUntil=Ni()+M,o.facing=Na(o.position,v.position),o.root.rotation.y=o.facing)},f=i._startAttack.bind(i);i._startAttack=()=>{const v=wu(o.position,i.cameraYaw,i.enemies,{maxRange:4.4,coneCos:-.12});return d(v,900),f()};const m=i._castSpell.bind(i);i._castSpell=()=>{const v=wu(o.position,i.cameraYaw,i.enemies,{maxRange:14,coneCos:-.22});return d(v,1100),m()};const _=o.update.bind(o);o.update=(v,M,x)=>{const T=_(v,M,x),E=s.focusTarget;return E&&!E.dead&&!E.remove&&o.state==="attack"&&(o.facing=Na(o.position,E.position),o.root.rotation.y=o.facing),T};const g=i._updateCamera.bind(i);i._updateCamera=v=>{const M=Ni(),x=s.focusTarget;x&&(x.dead||x.remove||M>s.focusUntil||o.position.distanceTo(x.position)>16)&&(s.focusTarget=null);const T=[...s.actionPointers.values()].some(C=>C.dragging);if(!(s.canvasLookActive||T||M-s.lastLookAt<260)&&s.focusTarget){const C=Na(o.position,s.focusTarget.position),I=1-Math.exp(-v*(o.state==="attack"?7.2:4.8));i.cameraYaw+=yS(i.cameraYaw,C)*I,i.cameraPitch+=(.24-i.cameraPitch)*(1-Math.exp(-v*3.2))}return g(v)};const p=document.querySelector("#intro small");return p&&(p.textContent="Left stick move · Drag right side or combat buttons to look · Hold ✦ to combo"),s}const wS=-.72,TS=.68,ES=.00165;function Ua(i,t,e=ES){const n=i-t*e;return Math.max(wS,Math.min(TS,n))}function AS(i){if(i.cameraPitchControls)return i.cameraPitchControls;const t=i.cameraPitchControls={desiredPitch:Ua(i.cameraPitch,0)},e=i.input.consumeLook.bind(i.input);i.input.consumeLook=()=>{const s=e();return t.desiredPitch=Ua(t.desiredPitch,s.y),{x:s.x,y:0}};const n=i._updateCamera.bind(i);return i._updateCamera=s=>{i.cameraPitch=t.desiredPitch;const r=n(s);return t.desiredPitch=Ua(i.cameraPitch,0),r},t}const io=["skeleton","ghost","bat"],_s={skeleton:{name:"Briar Warden",hp:1.55,speed:.72,attackRange:1.72,damage:14,radius:.62,windup:.78,recover:.62,telegraph:15188602,bar:15188602},ghost:{name:"Glade Wisp",hp:.68,speed:.95,attackRange:6.7,damage:10,radius:.46,windup:.64,recover:.48,telegraph:8317135,bar:9368540,blinkRange:2.45},bat:{name:"Skyrend",hp:.56,speed:1.58,attackRange:3.55,damage:9,radius:.42,windup:.3,recover:.96,telegraph:13084405,bar:13809407,diveScale:1.72}},fl={steel:{label:"Steel Oath",toast:"Steel Oath — your blade cuts deeper",meleePower:.18,detail:"Melee hits harder. A heavy cut still breaks a warden’s brace."},ember:{label:"Ember Oath",toast:"Ember Oath — the lance burns hotter",spellPower:.22,spellDiscount:4,detail:"Ember Lance hits harder and spends less mana."},warden:{label:"Warden Oath",toast:"Warden Oath — evade comes easier",dodgeInvuln:.08,dodgeHaste:.82,detail:"Evade returns sooner, and the invulnerable beat lasts longer."}},Tu={1:"ANCIENT WARDEN",2:"ROOTS RUPTURE",3:"RENDING CHARGE"},RS=.22,CS=34,PS=.42,IS=1.28,LS=26,DS=14;function NS(i){const t=(i%io.length+io.length)%io.length;return io[t]}function No(i){return!i||i.isBoss?"thornmaw":i.assetKind==="ghost"||i.assetKind==="bat"||i.assetKind==="skeleton"?i.assetKind:i.bestiaryRole||"skeleton"}function US(i,t,e,n,s){const r=n-t,o=s-e,a=Math.hypot(r,o);return a<.001?1:r/a*Math.sin(i)+o/a*Math.cos(i)}function FS(i,t,e){return t||i>=CS?1:e>RS?PS:1}function OS({role:i,state:t,facing:e=0,enemyX:n=0,enemyZ:s=0,fromX:r=0,fromZ:o=0,damage:a,crit:l=!1,meleePower:c=1,spellPower:h=1,context:u=null}){let d=a;u==="melee"&&(d=Math.round(d*c)),u==="spell"&&(d=Math.round(d*h)),i==="bat"&&t==="recover"&&(d=Math.round(d*IS));let f=!1;if(i==="skeleton"){const m=US(e,n,s,r,o),_=FS(d,l,m);f=_<1,d=Math.max(1,Math.round(d*_))}return{amount:d,guarded:f}}function BS(i){return i>.66?1:i>.33?2:3}function kS(i,t,e,n,s){return i<2||t!=="chase"?null:i>=3&&n<=0&&s>4.2&&s<13?"charge":e<=0&&s>2.8&&s<10.5?"rupture":null}function zS(i=0){return Math.max(DS,LS-i)}function HS(i,t){const e=fl[t];return!e||!i?null:(i.meleePower=(i.meleePower||1)+(e.meleePower||0),i.spellPower=(i.spellPower||1)+(e.spellPower||0),i.spellDiscount=(i.spellDiscount||0)+(e.spellDiscount||0),i.dodgeInvulnBonus=(i.dodgeInvulnBonus||0)+(e.dodgeInvuln||0),i.dodgeHaste=(i.dodgeHaste??1)*(e.dodgeHaste??1),i.oaths=[...i.oaths||[],t],e)}function VS(i,t=[]){const e=t[t.length-1],n=fl[e]?.label?.replace(" Oath","");return n?`Lv. ${i} · ${n}`:`Lv. ${i}`}const Uo=R,GS=new ai(.92,.09),WS=new ai(.86,.052),XS=new Fe(.16,8,6);let Eu=!1,po=null,Au=0;function pl(i,t,e=140){i?.tone?.(t,.1,"sine",.045,e),i?.noise?.(.04,.03,1500)}function Ru(i){if(!(!i||i.bestiaryNoted)){if(i.bestiaryNoted=!0,i.isBoss){i.bestiaryRole="thornmaw",i.bossPhase=i.bossPhase||1,i._ruptureCd=4.2,i._chargeCd=5.4;return}i.bestiaryRole=NS(Au++),i.orbitSign=Au%2===0?1:-1,i._blinkCd=.6,zd(i)}}function zd(i){const t=No(i);if(t==="thornmaw"||i.bestiaryApplied===t)return;const e=_s[t];if(!e)return;i.bestiaryBase||(i.bestiaryBase={maxHp:i.maxHp,hpRatio:i.maxHp>0?i.hp/i.maxHp:1,speed:i.speed,radius:i.radius});const n=i.bestiaryBase;i.maxHp=Math.max(1,Math.round(n.maxHp*e.hp)),i.hp=Math.max(1,Math.round(i.maxHp*n.hpRatio)),i.speed=n.speed*e.speed,i.attackRange=e.attackRange,i.damage=e.damage,i.radius=e.radius,i.bestiaryRole=t,i.bestiaryApplied=t,i.telegraph?.material?.color?.setHex(e.telegraph),i.hpFill?.material?.color&&i.hpFill.material.color.setHex(e.bar)}function ml(i,t,e=new Uo){return e.copy(t).sub(i),e.y=0,e.lengthSq()<1e-4?e.set(0,0,1):e.normalize(),e}function qS(i,t){const e=ml(i.position,t.player.position),n=new $(XS,new Nt({color:14221302,transparent:!0,opacity:.92,depthWrite:!1,blending:se}));n.position.copy(i.position).add(new Uo(0,1.2,0)).addScaledVector(e,.55),t.scene.add(n),t.enemyBolts.push({mesh:n,velocity:e.multiplyScalar(7.4),life:1.7,damage:i.damage,owner:i}),i.fx?.ring(i.position,8317135,.18,1.5,.26),pl(t.audio,760,180)}function KS(i,t){const e=new $(new Gi(.82,1,42),new Nt({color:i.bossPhase>=3?16731450:16742981,transparent:!0,opacity:.9,side:fe,depthWrite:!1,blending:se}));e.rotation.x=-Math.PI/2,e.position.copy(i.position),e.position.y=.07,t.scene.add(e),t.shockwaves.push({mesh:e,position:i.position.clone(),radius:.55,maxRadius:i.bossPhase>=3?8.6:6.4,speed:7.2,damage:i.bossPhase>=3?18:14,hit:!1,owner:i}),i.fx?.ring(i.position,16738876,.3,2.4,.45),t.audio?.noise?.(.16,.07,240),t.cameraShake=Math.max(t.cameraShake||0,.45)}function YS(i,t,e){i.bossPhase=t,i._ruptureCd=.85,i._chargeCd=t>=3?1.1:6;const n=e.ui?.bossKicker;if(n&&(n.textContent=Tu[t]||Tu[1]),t===2)e.toast("The roots rupture — move",1.5),e.audio?.boss?.();else if(t===3){e.toast("THORNMAW RENDS THE GLADE",1.6),e.audio?.boss?.(),e.cameraShake=Math.max(e.cameraShake||0,.72);const s=Math.random()*Math.PI*2;e._spawnEnemy?.(i.position.x+Math.cos(s)*4.2,i.position.z+Math.sin(s)*4.2)}i.fx?.ring(i.position,t===3?16730680:16747093,.35,t===3?6.5:4.8,.7)}function jS(i,t){const e=ml(t.position,i.position),n=new Uo(e.z,0,-e.x).multiplyScalar(i.orbitSign||1);i.position.addScaledVector(e,3.15).addScaledVector(n,1.35),i.velocity.set(0,0,0),i._blinkCd=2.35,i.fx?.ring(i.position,8317135,.12,1.3,.28)}function $S(i,t,e,n,s){if(!i||i.remove)return;zd(i);const r=No(i);if(i._blinkCd=Math.max(0,(i._blinkCd||0)-t),i.isBoss&&!i.dead){i._ruptureCd=Math.max(0,(i._ruptureCd||0)-t),i._chargeCd=Math.max(0,(i._chargeCd||0)-t);const a=BS(i.hp/i.maxHp);a!==(i.bossPhase||1)&&i.state!=="spawn"&&YS(i,a,s)}if(!i.dead&&n!==i.state){const a=_s[r];a&&i.state==="windup"&&(i.stateDuration=a.windup),a&&i.state==="recover"&&(i.stateDuration=a.recover),r==="ghost"&&i.state==="attack"&&qS(i,s),i.isBoss&&i.state==="attack"&&i._pendingRupture&&(KS(i,s),i._pendingRupture=!1,i._ruptureActive=!0)}r==="ghost"&&i.state==="attack"&&(i.velocity.set(0,0,0),i.attackEvent=!1),i._ruptureActive&&i.state==="attack"&&(i.velocity.set(0,0,0),i.attackEvent=!1),i.state!=="attack"&&(i._ruptureActive=!1);const o=i.state==="attack"&&i.stateTime<i.stateDuration*.5;if(r==="bat"&&o&&i.velocity.multiplyScalar(_s.bat.diveScale),r==="skeleton"&&o&&i.velocity.multiplyScalar(.82),r==="bat"&&i.state==="chase"){const a=new Uo(Math.cos(i.facing),0,-Math.sin(i.facing));i.velocity.addScaledVector(a,i.speed*.62*(i.orbitSign||1))}if(i.isBoss&&o&&i._pendingCharge){const a=ml(i.position,e.position);i.velocity.set(a.x*11.2,0,a.z*11.2)}if(i.state!=="windup"&&i.state!=="attack"&&(i._pendingCharge=!1),r==="ghost"&&!i.dead&&(i.state==="chase"||i.state==="recover")&&i.position.distanceTo(e.position)<_s.ghost.blinkRange&&i._blinkCd<=0&&i.state!=="spawn"&&jS(i,e),i.isBoss&&!i.dead&&i.state==="chase"){const a=i.position.distanceTo(e.position),l=kS(i.bossPhase||1,i.state,i._ruptureCd,i._chargeCd,a);l==="charge"?(i.state="windup",i.stateTime=0,i.stateDuration=.52,i._pendingCharge=!0,i._chargeCd=6.4,i.velocity.multiplyScalar(.2)):l==="rupture"&&(i.state="windup",i.stateTime=0,i.stateDuration=1.12,i._pendingRupture=!0,i._ruptureCd=i.bossPhase>=3?4.4:5.6,i.velocity.multiplyScalar(.15))}}function gl(i){i.parent?.remove(i),i.traverse?.(t=>{if(t.material&&t.userData?.disposeMaterial!==!1){const e=Array.isArray(t.material)?t.material:[t.material];for(const n of e)n.dispose?.()}})}function JS(i,t){const e=i.player;for(let n=i.enemyBolts.length-1;n>=0;n--){const s=i.enemyBolts[n];s.life-=t,s.mesh.position.addScaledVector(s.velocity,t);const r=e.position.clone();r.y+=.9;const o=s.mesh.position.distanceTo(r)<.72;o&&!e.dead&&(e.takeDamage(s.damage,s.owner?.position||s.mesh.position)&&(i.ui?.damageFlash?.classList.add("hit"),setTimeout(()=>i.ui?.damageFlash?.classList.remove("hit"),55),i.cameraShake=Math.max(i.cameraShake||0,.28)),i.fx?.burst(s.mesh.position,12124144,10,3.2,.7)),(o||s.life<=0)&&(gl(s.mesh),i.enemyBolts.splice(n,1))}}function ZS(i,t){const e=i.player;for(let n=i.shockwaves.length-1;n>=0;n--){const s=i.shockwaves[n];s.radius+=s.speed*t,s.mesh.position.copy(s.position),s.mesh.position.y=.07,s.mesh.scale.setScalar(s.radius),s.mesh.material.opacity=Math.max(0,.9*(1-s.radius/s.maxRadius));const r=Math.hypot(e.position.x-s.position.x,e.position.z-s.position.z);!s.hit&&Math.abs(r-s.radius)<.85&&s.radius>1.15&&!e.dead&&(s.hit=!0,e.takeDamage(s.damage,s.position)&&(i.ui?.damageFlash?.classList.add("hit"),setTimeout(()=>i.ui?.damageFlash?.classList.remove("hit"),55),i.cameraShake=Math.max(i.cameraShake||0,.62),i.hitStop=Math.max(i.hitStop||0,.04))),s.radius>=s.maxRadius&&(s.mesh.geometry.dispose(),gl(s.mesh),i.shockwaves.splice(n,1))}}function QS(i){const t=i.bestiaryBars;for(const e of i.enemies){if(e.isBoss||e.dead||e.remove)continue;const n=No(e),s=_s[n];if(!s)continue;if(!(e.state==="chase"||e.state==="windup"||e.state==="attack"||e.state==="recover"||e.state==="stagger"||e.hp<e.maxHp)){e.hpBar&&(e.hpBar.visible=!1);continue}if(!e.hpBar){const a=new Gt,l=new $(GS,new Nt({color:1314316,transparent:!0,opacity:.82,depthTest:!1,side:fe})),c=new $(WS,new Nt({color:s.bar,depthTest:!1,side:fe}));c.position.z=.01,a.add(l,c),i.scene.add(a),e.hpBar=a,e.hpFill=c,t.add(e)}const o=Math.max(0,e.hp/e.maxHp);e.hpBar.visible=!0,e.hpBar.position.copy(e.position),e.hpBar.position.y+=2.15,e.hpBar.lookAt(i.camera.position),e.hpFill.scale.x=Math.max(.001,o),e.hpFill.position.x=(o-1)*.43,e.hpFill.material.color.setHex(s.bar)}for(const e of t)i.enemies.includes(e)&&!e.dead&&!e.remove||(e.hpBar&&(gl(e.hpBar),e.hpBar=null,e.hpFill=null),t.delete(e))}function tb(i){i.oathOpen=!0,i.input?.pressed?.clear(),i.input?.mobileActions?.clear(),i.ui?.oath?.classList.remove("hidden"),i.input?.releasePointerLock?.()}function Hd(i,t){if(!i.oathOpen)return;const e=HS(i.player,t);e&&(i.player.oathPending=Math.max(0,(i.player.oathPending||1)-1),i.oathOpen=i.player.oathPending>0,i.oathOpen||i.ui?.oath?.classList.add("hidden"),i.toast(e.toast,1.35),pl(i.audio,t==="ember"?620:t==="warden"?490:540,90),!i.oathOpen&&!i.input?.isCoarse&&i.input?.requestPointerLock?.())}function eb(i){const t=[["Digit1","steel"],["Digit2","ember"],["Digit3","warden"]];for(const[e,n]of t)if(i.input?.pressed?.has(e)){i.input.pressed.delete(e),Hd(i,n);return}}function nb(){const i=In.prototype.update;In.prototype.update=function(o,a){const l=this.state,c=i.call(this,o,a);return po&&$S(this,o,a,l,po),c};const t=In.prototype.takeHit;In.prototype.takeHit=function(o,a,l=!1){const c=po,h=OS({role:No(this),state:this.state,facing:this.facing,enemyX:this.position.x,enemyZ:this.position.z,fromX:a?.x??this.position.x,fromZ:a?.z??this.position.z,damage:o,crit:l,meleePower:c?.player?.meleePower||1,spellPower:c?.player?.spellPower||1,context:c?.hitContext||null});c&&(c.pendingDamageNumber=h.amount),h.guarded&&c&&!c.seenGuard&&(c.seenGuard=!0,c.toast("Brace — circle behind, or break it with Ember",1.35),pl(c.audio,910,-220));const u=t.call(this,h.amount,a,l);return!u&&c&&(c.pendingDamageNumber=null),u};const e=yn.prototype.addXp;yn.prototype.addXp=function(o){const a=e.call(this,o);return a&&(this.oathPending=(this.oathPending||0)+1),a};const n=_e.prototype._frame;_e.prototype._frame=function(){if(this.started&&!this.oathOpen&&this.player?.oathPending>0&&!this.victoryShown&&!this.player.dead&&tb(this),this.oathOpen){const o=Math.min(.033,this.clock.getDelta());eb(this),this.world.update(o),this.fx.update(o),this._render();return}return n.call(this)};const s=_e.prototype._handleInput;_e.prototype._handleInput=function(o){const a=this.player,l=zS(a?.spellDiscount||0),c=a?.mana??0,h=Math.max(0,26-l);a&&h>0&&a.mana>=l&&a.mana<26&&(a.mana+=h);const u=a?.mana??c,d=this.dodgeCooldown;if(s.call(this,o),a){const f=u-a.mana;f>=25.5?a.mana=Math.min(a.maxMana,c-l):a.mana=c-f}this.dodgeCooldown>d+.01&&a?.dodgeHaste&&a.dodgeHaste<1&&(this.dodgeCooldown*=a.dodgeHaste)};const r=_e.prototype._damageNumber;_e.prototype._damageNumber=function(o,a,l){const c=this.pendingDamageNumber??a;return this.pendingDamageNumber=null,r.call(this,o,c,l)}}function ib(i){i.enemyBolts=[],i.shockwaves=[],i.bestiaryBars=new Set,i.oathOpen=!1,i.ui.oath=document.querySelector("#oath"),i.ui.bossKicker=document.querySelector(".boss-kicker");const t=i._spawnEnemy.bind(i);i._spawnEnemy=(...a)=>{const l=t(...a);return Ru(l),l};for(const a of i.enemies)Ru(a);const e=i._updateEnemies.bind(i);i._updateEnemies=(a,l)=>{const c=e(a,l);return JS(i,a),ZS(i,a),QS(i),c};const n=i._resolveMelee.bind(i);i._resolveMelee=function(...a){this.hitContext="melee";try{return n(...a)}finally{this.hitContext=null}};const s=i._updateProjectiles.bind(i);i._updateProjectiles=function(a){this.hitContext="spell";try{return s(a)}finally{this.hitContext=null}};const r=i.player.beginDodge.bind(i.player);i.player.beginDodge=function(a){const l=r(a);return l&&this.dodgeInvulnBonus&&(this.invuln+=this.dodgeInvulnBonus),l};const o=i._updateHUD.bind(i);i._updateHUD=function(){o();const a=VS(this.player.level,this.player.oaths);this.ui.level.textContent!==a&&(this.ui.level.textContent=a)},document.querySelectorAll("#oath [data-oath]").forEach(a=>{a.addEventListener("click",()=>Hd(i,a.dataset.oath))})}function sb(i){return Eu||(Eu=!0,nb()),po=i,ib(i),{roles:_s,oaths:fl}}const rb=document.querySelector("#game"),Ae=new _e(rb);Hx(Ae);const nr=document.querySelector("#enter-btn");nr.disabled=!0;nr.textContent="Summoning the Glade…";const Fa=UM(Ae);ZM(Ae);KM(Ae);iy(Ae);vy(Ae);const Vd=Gy(Ae);qy(Ae,Vd);jy(Ae,Vd);eS(Ae);const Gd=new URLSearchParams(location.search).get("perf")==="off",Cu=Gd?null:uS(Ae),ob=Gd?null:gS(Ae);bS(Ae);AS(Ae);sb(Ae);const ab=zM(Ae),cb=GM(Ae);function lb(i=15e3){return new Promise(t=>{const e=performance.now(),n=()=>{if(Fa.ready&&Fa.heroReady||Fa.failures.length||performance.now()-e>i){t();return}requestAnimationFrame(n)};n()})}Promise.allSettled([lb(),ab,cb]).then(async()=>{Cu&&(Cu.rebatch(),ob?.freezeStaticDecor(),await MS(Ae)),nr.textContent="Enter the Glade",nr.disabled=!1,nr.dataset.ready="true"});Ae.start();window.__MAPLES_GAME__=Ae;
