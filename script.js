// 🗺️ Carte Interactive de la Tunisie - Version Magnifique
(() => {
	// ============== STATE ==============
	let pinnedRegionId = null;
	let favorites = JSON.parse(localStorage.getItem('tunisiaMapFavorites') || '[]');
	let theme = localStorage.getItem('tunisiaMapTheme') || 'light';

	// ============== REGION DATA ==============
	const regionContent = {
		bizert: { title: 'Bizerte', img: 'assets/images/icones/Bizerte.png', type: 'Région côtière du nord, portuaire et touristique.', desc: 'Bizerte est une région côtière du nord de la Tunisie, connue pour son vieux port, ses plages et son ouverture sur la Méditerranée. Elle combine activités maritimes, tourisme et patrimoine urbain.' },
		beja: { title: 'Béja', img: 'assets/images/icones/Beja.png', type: 'Région intérieure agricole du nord-ouest.', desc: 'Béja est une région agricole du nord-ouest, réputée pour ses paysages verdoyants et sa production céréalière. On y trouve aussi des sites historiques et une vie rurale riche.' },
		jendouba: { title: 'Jendouba', img: 'assets/images/icones/Jendouba.png', type: 'Région forestière et montagneuse du nord-ouest.', desc: 'Jendouba se distingue par ses forêts, ses reliefs et ses ressources naturelles. La région est connue pour ses sites archéologiques (ex: Bulla Regia) et son tourisme vert.' },
		manouba: { title: 'Manouba', img: 'assets/images/icones/Manouba.png', type: 'Région urbaine et périurbaine du Grand Tunis.', desc: 'La Manouba fait partie du Grand Tunis et combine zones urbaines, espaces agricoles et pôles universitaires. Elle joue un rôle important dans la dynamique économique autour de la capitale.' },
		benarous: { title: 'Ben Arous', img: 'assets/images/icones/Benarous.png', type: 'Région industrielle et résidentielle du Grand Tunis.', desc: 'Ben Arous est une région du Grand Tunis, avec une forte présence de zones industrielles et de quartiers résidentiels. Elle assure un lien stratégique entre la capitale et plusieurs axes routiers majeurs.' },
		ariena: { title: 'Ariana', img: 'assets/images/icones/Ariena.png', type: 'Région résidentielle et universitaire du Grand Tunis.', desc: "L'Ariana se situe au nord de Tunis. Elle est connue pour ses quartiers résidentiels, ses espaces verts et ses services. C'est une zone dynamique, proche des pôles économiques et technologiques." },
		tunis: { title: 'Tunis', img: 'assets/images/icones/Tunis.png', type: 'Capitale et grande métropole nationale.', isCapital: true, desc: 'Tunis est la capitale de la Tunisie et le cœur politique, économique et culturel du pays. Elle associe la médina historique, des quartiers modernes et une vie urbaine très active.' },
		nabeul: { title: 'Nabeul', img: 'assets/images/icones/Nabeul.png', type: 'Région côtière touristique du nord-est.', desc: 'Nabeul est une région côtière réputée pour ses plages, son artisanat (poterie) et son attractivité touristique. Elle inclut des zones très fréquentées comme Hammamet et des espaces agricoles autour.' },
		zaghouan: { title: 'Zaghouan', img: 'assets/images/icones/Zaghouan.png', type: 'Région de moyenne montagne et de sources.', desc: 'Zaghouan est située au pied du Djebel Zaghouan et est connue pour ses sources et son cadre montagneux. La région possède un héritage romain important et une nature appréciée.' },
		kef: { title: 'Le Kef', img: 'assets/images/icones/Kef.png', type: 'Région montagneuse et historique du nord-ouest.', desc: 'Le Kef est une région historique du nord-ouest, avec un relief élevé et un patrimoine architectural remarquable. Elle offre des panoramas, des sites culturels et une identité locale forte.' },
		siliana: { title: 'Siliana', img: 'assets/images/icones/Siliana.png', type: 'Région intérieure agricole et vallonnée.', desc: 'Siliana est une région intérieure à vocation agricole, marquée par des collines et des paysages ruraux. Elle constitue une zone de transition entre le nord et le centre du pays.' },
		kairouan: { title: 'Kairouan', img: 'assets/images/icones/kairouan.png', type: 'Région intérieure à forte valeur religieuse et culturelle.', desc: "Kairouan est l'une des plus anciennes villes islamiques et un centre spirituel majeur. Elle est célèbre pour sa grande mosquée, son artisanat et son patrimoine culturel." },
		sousse: { title: 'Sousse', img: 'assets/images/icones/sousse.png', type: 'Grande région côtière touristique du centre-est.', desc: 'Sousse est une grande ville côtière très touristique, avec une médina classée et de nombreuses infrastructures. La région associe tourisme, services et activités économiques diversifiées.' },
		monastir: { title: 'Monastir', img: 'assets/images/icones/Monastir.png', type: 'Région côtière historique et balnéaire du centre-est.', desc: "Monastir est connue pour son Ribat, son port de plaisance et ses plages. La région est également liée à l'histoire moderne et à l'activité touristique." },
		mahdia: { title: 'Mahdia', img: 'assets/images/icones/Mahdia.png', type: 'Région côtière de pêche et de tourisme.', desc: 'Mahdia est une ville côtière réputée pour son port de pêche, ses plages et sa médina. Elle possède une histoire marquée par la période fatimide et une identité maritime forte.' },
		sfax: { title: 'Sfax', img: 'assets/images/icones/Sfax.png', type: 'Grand pôle économique, industriel et portuaire.', desc: "Sfax est un pôle économique majeur, avec un port important et une industrie active. La région est aussi connue pour sa médina et ses activités agricoles (notamment l'olive)." },
		sidibouzid: { title: 'Sidi Bouzid', img: 'assets/images/icones/sidibouzid.png', type: 'Région intérieure agricole du centre.', desc: 'Sidi Bouzid est une région principalement agricole, connue aussi pour son rôle dans l\'histoire récente de la Tunisie. Elle dispose de vastes plaines et d\'une activité agricole importante.' },
		kasserine: { title: 'Kasserine', img: 'assets/images/icones/Kasserine.png', type: 'Région montagneuse du centre-ouest.', desc: 'Kasserine est une région du centre-ouest, dominée par des reliefs montagneux (mont Chaambi). Elle combine paysages naturels, agriculture et héritage historique.' },
		gafsa: { title: 'Gafsa', img: 'assets/images/icones/Gafsa.png', type: 'Région de bassin minier et d\'oasis du sud-ouest.', desc: 'Gafsa est connue pour son bassin minier (phosphates) et ses oasis. La région offre aussi des sites naturels remarquables dans le sud-ouest.' },
		tozeur: { title: 'Tozeur', img: 'assets/images/icones/Tozeur.png', type: 'Région d\'oasis saharienne du sud-ouest.', desc: 'Tozeur est une oasis emblématique aux portes du Sahara, proche du Chott El Jerid. Elle est réputée pour son architecture en briques et son tourisme saharien.' },
		kebili: { title: 'Kébili', img: 'assets/images/icones/kebili.png', type: 'Région désertique et d\'oasis du sud.', desc: "Kébili est une région désertique riche en oasis, souvent considérée comme une porte d'entrée vers le Sahara. Elle est proche du Chott El Jerid et de circuits touristiques sahariens." },
		gabes: { title: 'Gabès', img: 'assets/images/icones/gabes.png', type: 'Région côtière et industrielle du sud.', desc: 'Gabès est une ville côtière du sud, connue pour son oasis littorale unique. La région est un point de passage vers le sud tunisien et des zones désertiques.' },
		tataouine: { title: 'Tataouine', img: 'assets/images/icones/Tataouine.png', type: 'Région saharienne et de ksour du sud.', desc: 'Tataouine est une région du sud désertique, célèbre pour ses ksour, ses paysages sahariens et sa culture locale. Elle attire aussi pour ses décors naturels et son patrimoine architectural traditionnel.' },
		medenine: { title: 'Médenine', img: 'assets/images/icones/medenine.png', type: 'Région de transition entre littoral et Sahara.', desc: "Médenine est un carrefour du sud, reliant le continent à l'île de Djerba et aux routes vers le désert. On y trouve des ksour, une identité saharienne et une forte activité de transit." },
		medenine_djerba: { title: 'Djerba', img: 'assets/images/icones/medenine.png', type: 'Île touristique méditerranéenne.', desc: 'Djerba est une île touristique majeure, réputée pour ses plages, son artisanat et son patrimoine. Sur cette carte, Djerba est rattachée à la région de Médenine.' }
	};

	const regionNames = {
		bizert: 'Bizerte', beja: 'Béja', jendouba: 'Jendouba', manouba: 'Manouba',
		benarous: 'Ben Arous', ariena: 'Ariana', tunis: 'Tunis', nabeul: 'Nabeul',
		zaghouan: 'Zaghouan', kef: 'Le Kef', siliana: 'Siliana', kairouan: 'Kairouan',
		sousse: 'Sousse', monastir: 'Monastir', mahdia: 'Mahdia', sfax: 'Sfax',
		sidibouzid: 'Sidi Bouzid', kasserine: 'Kasserine', gafsa: 'Gafsa', tozeur: 'Tozeur',
		kebili: 'Kébili', gabes: 'Gabès', tataouine: 'Tataouine', medenine: 'Médenine'
	};

	const regionCenters = {
		bizert: { x: 95, y: 30 }, beja: { x: 80, y: 45 }, jendouba: { x: 55, y: 45 },
		manouba: { x: 100, y: 40 }, benarous: { x: 115, y: 45 }, ariena: { x: 115, y: 37 },
		tunis: { x: 118, y: 40 }, nabeul: { x: 135, y: 45 }, zaghouan: { x: 105, y: 58 },
		kef: { x: 58, y: 65 }, siliana: { x: 85, y: 70 }, kairouan: { x: 105, y: 80 },
		sousse: { x: 125, y: 70 }, monastir: { x: 140, y: 85 }, mahdia: { x: 125, y: 95 },
		sfax: { x: 120, y: 115 }, sidibouzid: { x: 85, y: 115 }, kasserine: { x: 60, y: 95 },
		gafsa: { x: 60, y: 130 }, tozeur: { x: 25, y: 150 }, kebili: { x: 60, y: 175 },
		gabes: { x: 100, y: 155 }, tataouine: { x: 100, y: 220 }, medenine: { x: 125, y: 170 }
	};

	const overrides = { bizert: 'bizerte', mahdia: 'mehdia', medenine_djerba: 'medenine' };

	// ============== THEME ==============
	function initTheme() {
		document.documentElement.setAttribute('data-theme', theme);
		const btn = document.getElementById('themeToggle');
		if (btn) btn.addEventListener('click', () => {
			theme = theme === 'light' ? 'dark' : 'light';
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem('tunisiaMapTheme', theme);
			showToast(theme === 'dark' ? '🌙 Mode sombre' : '☀️ Mode clair');
		});
	}

	// ============== TOAST ==============
	function showToast(msg, duration = 2200) {
		const toast = document.getElementById('toast');
		if (!toast) return;
		toast.textContent = msg;
		toast.classList.add('show');
		setTimeout(() => toast.classList.remove('show'), duration);
	}

	// ============== SEARCH ==============
	function setupSearch() {
		const input = document.getElementById('regionSearch');
		const results = document.getElementById('searchResults');
		if (!input || !results) return;

		input.addEventListener('input', (e) => {
			const q = e.target.value.toLowerCase().trim();
			if (!q) {
				results.classList.remove('active');
				return;
			}

			const matches = Object.entries(regionContent)
				.filter(([_, data]) => 
					data.title.toLowerCase().includes(q) ||
					data.type.toLowerCase().includes(q) ||
					data.desc.toLowerCase().includes(q)
				).slice(0, 5);

			if (matches.length === 0) {
				results.innerHTML = '<div class="search-no-results">Aucune région trouvée 😔</div>';
				results.classList.add('active');
				return;
			}

			results.innerHTML = matches.map(([id, data]) => {
				const title = data.title.replace(new RegExp(`(${q})`, 'gi'), '<strong>$1</strong>');
				return `<div class="search-result-item" data-id="${id}">${title} - <span style="color: var(--text-muted);">${data.type}</span></div>`;
			}).join('');
			results.classList.add('active');

			results.querySelectorAll('.search-result-item').forEach(item => {
				item.addEventListener('click', () => {
					selectRegion(item.dataset.id);
					input.value = '';
					results.classList.remove('active');
				});
			});
		});

		document.addEventListener('click', (e) => {
			if (!input.contains(e.target) && !results.contains(e.target)) {
				results.classList.remove('active');
			}
		});
	}

	function selectRegion(id) {
		try {
			window.setPinnedRegion(id);
			window.showRegionInfo(id, { preview: false });
			const obj = document.getElementById('tunisia-map-object');
			if (obj?.contentDocument) applyPinnedStyle(obj.contentDocument, id);
			const card = document.querySelector('.info-card');
			if (card && window.matchMedia('(max-width: 1100px)').matches) {
				card.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
			showToast(`📍 ${regionContent[id]?.title || 'Région'}`);
		} catch (err) {
			console.error('Erreur:', err);
		}
	}

	// ============== FAVORITES ==============
	function setupFavorites() {
		const btn = document.getElementById('favoriteBtn');
		if (!btn) return;
		btn.addEventListener('click', () => {
			if (!pinnedRegionId) return;
			const isFav = favorites.includes(pinnedRegionId);
			if (isFav) {
				favorites = favorites.filter(id => id !== pinnedRegionId);
				btn.classList.remove('active');
				showToast('💔 Retiré des favoris');
			} else {
				favorites.push(pinnedRegionId);
				btn.classList.add('active');
				showToast('❤️ Ajouté aux favoris');
			}
			localStorage.setItem('tunisiaMapFavorites', JSON.stringify(favorites));
		});
	}

	function updateFavoriteButton() {
		const btn = document.getElementById('favoriteBtn');
		if (!btn) return;
		if (pinnedRegionId && favorites.includes(pinnedRegionId)) {
			btn.classList.add('active');
		} else {
			btn.classList.remove('active');
		}
	}

	// ============== SHARE ==============
	function setupShare() {
		const btn = document.getElementById('shareBtn');
		if (!btn) return;
		btn.addEventListener('click', async () => {
			if (!pinnedRegionId) return;
			const data = regionContent[pinnedRegionId];
			if (!data) return;
			const shareData = {
				title: `Découvre ${data.title} - Tunisie`,
				text: `${data.title}: ${data.type}`,
				url: window.location.href
			};
			try {
				if (navigator.share) {
					await navigator.share(shareData);
					showToast('✨ Partagé !');
				} else {
					await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
					showToast('📋 Copié !');
				}
			} catch (err) {
				if (err.name !== 'AbortError') showToast('❌ Erreur');
			}
		});
	}

	// ============== INFO PANEL ==============
	function setupRegionInfoPanel() {
		const title = document.getElementById('regionTitle');
		const subtitle = document.getElementById('regionSubtitle');
		const meta = document.getElementById('regionMeta');
		const badge = document.getElementById('regionBadge');
		const desc = document.getElementById('regionDesc');
		const img = document.getElementById('regionImage');
		const skeleton = document.getElementById('imageSkeleton');
		const actions = document.getElementById('infoActions');
		const card = document.querySelector('.info-card');
		if (!title || !subtitle || !desc || !img || !card) return;

		let currentKey = null;
		let raf = 0;

		function applyData(data) {
			title.textContent = data.title;
			subtitle.textContent = pinnedRegionId ? 'Région sélectionnée' : 'Clique sur la carte pour explorer';
			desc.textContent = data.desc;

			if (meta) meta.textContent = data.type ? `📌 ${data.type}` : '';
			if (badge) {
				badge.hidden = !data.isCapital;
				if (data.isCapital) {
					badge.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Capitale';
				}
			}
			if (actions) actions.hidden = !pinnedRegionId;

			if (data.img) {
				if (skeleton) skeleton.style.display = 'block';
				img.classList.remove('is-visible');
				img.alt = data.title;
				img.src = data.img;
				img.onload = () => {
					img.classList.add('is-visible');
					if (skeleton) skeleton.style.display = 'none';
				};
				img.onerror = () => {
					img.classList.remove('is-visible');
					img.removeAttribute('src');
					img.alt = '';
					if (skeleton) skeleton.style.display = 'none';
				};
			}
			updateFavoriteButton();
		}

		window.showRegionInfo = (rawId, { preview = false } = {}) => {
			const key = rawId?.trim();
			if (!key) return;
			if (!preview && key === currentKey) return;
			currentKey = key;

			const data = regionContent[key] || regionContent[overrides[key] || key] || null;
			if (!data) return;

			card.classList.remove('is-ready');
			card.classList.add('is-updating');

			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				applyData(data);
				setTimeout(() => {
					card.classList.remove('is-updating');
					card.classList.add('is-ready');
				}, 180);
			});
		};
	}

	// ============== PINNED ==============
	window.getPinnedRegion = () => pinnedRegionId;
	window.setPinnedRegion = (rawId) => {
		const id = rawId?.trim();
		if (!id) return pinnedRegionId;
		pinnedRegionId = (pinnedRegionId === id) ? null : id;
		return pinnedRegionId;
	};

	// ============== SVG ==============
	const SVG_NS = 'http://www.w3.org/2000/svg';
	const XLINK_NS = 'http://www.w3.org/1999/xlink';

	function isRegionId(id) {
		if (!id) return false;
		if (id === 'layer1' || id === 'defs1') return false;
		if (id.startsWith('path')) return false;
		return true;
	}

	function injectSvgStyles(doc) {
		const style = doc.createElementNS(SVG_NS, 'style');
		style.textContent = `
			image { pointer-events: none !important; }
			#path42, #path64, #path65 { display: none !important; }

			.region-link { cursor: pointer; outline: none; }
			.region-link path {
				fill: #ff6b35 !important;
				stroke: rgba(255, 107, 53, 0.7) !important;
				stroke-width: 0.5 !important;
				transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
			}

			.region-link:hover path {
				fill: #ff8c61 !important;
				stroke: rgba(255, 107, 53, 0.95) !important;
				opacity: 0.95;
				transform: scale(1.03);
			}

			.region-link.is-pinned path {
				fill: #e6522c !important;
				stroke: rgba(230, 82, 44, 1) !important;
				stroke-width: 1.2 !important;
				opacity: 1 !important;
				animation: regionPulse 2.5s ease-in-out infinite;
			}

			@keyframes regionPulse {
				0%, 100% { transform: scale(1); opacity: 1; }
				50% { transform: scale(1.04); opacity: 0.9; }
			}

			.region-label {
				font-family: 'Segoe UI', Arial, sans-serif;
				font-size: 4px;
				font-weight: 900;
				fill: white;
				text-anchor: middle;
				pointer-events: none;
				user-select: none;
				text-shadow: 0 0 3px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.95);
				letter-spacing: 0.3px;
			}

			svg { background: transparent; }
			#tunis path { stroke-width: 0.85 !important; }

			.capital-marker {
				pointer-events: none;
				animation: capitalGlow 3.5s ease-in-out infinite;
			}

			@keyframes capitalGlow {
				0%, 100% {
					opacity: 0.22;
					transform: scale(1);
				}
				50% {
					opacity: 0.38;
					transform: scale(1.15);
				}
			}
		`;
		const svg = doc.querySelector('svg');
		if (svg) svg.insertBefore(style, svg.firstChild);
	}

	function addRegionLabels(svgDoc, svgRoot) {
		if (!svgRoot) return;
		const layer1 = svgRoot.querySelector('#layer1');
		if (!layer1) return;

		Object.keys(regionCenters).forEach(id => {
			const center = regionCenters[id];
			const name = regionNames[id] || id;
			const text = svgDoc.createElementNS(SVG_NS, 'text');
			text.setAttribute('class', 'region-label');
			text.setAttribute('x', center.x);
			text.setAttribute('y', center.y);
			text.textContent = name;
			layer1.appendChild(text);
		});
	}

	function addDjerbaHotspot(svgDoc, svgRoot) {
		if (!svgRoot) return;
		const circle = svgDoc.createElementNS(SVG_NS, 'circle');
		circle.setAttribute('id', 'medenine_djerba');
		circle.setAttribute('cx', '155');
		circle.setAttribute('cy', '205');
		circle.setAttribute('r', '7');
		circle.setAttribute('fill', 'rgba(255, 107, 53, 0.35)');
		circle.setAttribute('stroke', 'rgba(255, 107, 53, 0.7)');
		circle.setAttribute('stroke-width', '0.6');
		circle.setAttribute('pointer-events', 'all');
		svgRoot.appendChild(circle);
	}

	function addTunisCapitalMarker(svgDoc, svgRoot) {
		if (!svgRoot || svgDoc.getElementById('tunis_capital_marker')) return;
		const center = regionCenters.tunis || { x: 118, y: 37 };
		const ring = svgDoc.createElementNS(SVG_NS, 'circle');
		ring.setAttribute('id', 'tunis_capital_marker');
		ring.setAttribute('class', 'capital-marker');
		ring.setAttribute('cx', String(center.x));
		ring.setAttribute('cy', String(center.y));
		ring.setAttribute('r', '10');
		ring.setAttribute('fill', 'rgba(247, 183, 49, 0.25)');
		ring.setAttribute('stroke', 'rgba(247, 183, 49, 0.65)');
		ring.setAttribute('stroke-width', '1.2');
		svgRoot.appendChild(ring);
	}

	function clearPinnedStyles(svgDoc) {
		try {
			svgDoc.querySelectorAll('.region-link.is-pinned').forEach(a => a.classList.remove('is-pinned'));
		} catch (_) {}
	}

	function applyPinnedStyle(svgDoc, pinnedId) {
		if (!svgDoc) return;
		clearPinnedStyles(svgDoc);
		if (!pinnedId) return;
		try {
			const el = svgDoc.getElementById(pinnedId);
			const a = el?.closest('a');
			if (a) a.classList.add('is-pinned');
		} catch (_) {}
	}

	function makeClickable(svgDoc, svgRoot) {
		if (!svgRoot) return;

		injectSvgStyles(svgDoc);
		addRegionLabels(svgDoc, svgRoot);

		svgRoot.querySelectorAll('path[id], g[id], circle[id], polygon[id]').forEach(el => {
			const id = el.id?.trim();
			if (!isRegionId(id)) return;

			const parent = el.parentNode;
			if (parent?.tagName?.toLowerCase() !== 'a') {
				const a = svgDoc.createElementNS(SVG_NS, 'a');
				a.setAttribute('href', '#');
				a.setAttributeNS(XLINK_NS, 'xlink:href', '#');
				a.setAttribute('class', 'region-link');
				a.setAttribute('target', '_top');

				a.addEventListener('click', (e) => {
					e.preventDefault();
					try {
						const pinnedNow = window.top?.setPinnedRegion?.(id);
						window.top?.showRegionInfo?.(id, { preview: false });
						applyPinnedStyle(svgDoc, pinnedNow);

						const card = window.top?.document.querySelector('.info-card');
						if (card && window.matchMedia?.('(max-width: 1100px)').matches) {
							card.scrollIntoView({ behavior: 'smooth', block: 'start' });
						}
					} catch (_) {}
				});

				a.addEventListener('mouseenter', () => {
					try {
						if (window.top?.getPinnedRegion?.()) return;
						window.top?.showRegionInfo?.(id, { preview: true });
					} catch (_) {}
				});

				const titleEl = el.querySelector?.('title');
				a.setAttribute('aria-label', titleEl ? titleEl.textContent.trim() : id);

				try {
					parent.replaceChild(a, el);
					a.appendChild(el);
				} catch (_) {}
			}

			try {
				el.style.cursor = 'pointer';
			} catch (_) {}
		});
	}

	// ============== ZOOM ==============
	function setupZoomControls() {
		const mapObject = document.getElementById('tunisia-map-object');
		const zoomInBtn = document.getElementById('mapZoomIn');
		const zoomOutBtn = document.getElementById('mapZoomOut');
		const zoomResetBtn = document.getElementById('mapZoomReset');
		const zoomLevelLabel = document.getElementById('mapZoomLevel');

		if (!mapObject || !zoomInBtn || !zoomOutBtn || !zoomResetBtn || !zoomLevelLabel) return;

		let zoom = 1;
		let pan = { x: 0, y: 0 };
		const MIN_ZOOM = 0.75;
		const MAX_ZOOM = 2.5;
		const STEP = 0.25;

		function applyTransform() {
			mapObject.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;
			zoomLevelLabel.textContent = `${Math.round(zoom * 100)}%`;

			const inner = document.querySelector('.map-inner');
			const hint = document.getElementById('mapHint');
			if (inner) {
				if (zoom > 1.05) {
					inner.classList.add('is-zoomed');
					if (hint) hint.textContent = 'Glisse pour explorer les détails';
				} else {
					inner.classList.remove('is-zoomed');
					if (hint) hint.textContent = 'Clique sur une région pour découvrir ses secrets';
				}
			}
		}

		function setZoom(value) {
			zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Number(value)));
			applyTransform();
		}

		function setPan(x, y) {
			pan.x = x;
			pan.y = y;
			applyTransform();
		}

		window.__mapTransform = {
			getZoom: () => zoom,
			getPan: () => ({ x: pan.x, y: pan.y }),
			setZoom,
			setPan,
			reset: () => {
				zoom = 1;
				pan = { x: 0, y: 0 };
				applyTransform();
			}
		};

		zoomInBtn.addEventListener('click', () => setZoom(+(zoom + STEP).toFixed(2)));
		zoomOutBtn.addEventListener('click', () => setZoom(+(zoom - STEP).toFixed(2)));
		zoomResetBtn.addEventListener('click', () => window.__mapTransform?.reset());
		applyTransform();
	}

	// ============== PAN ==============
	function setupPanInteraction() {
		const inner = document.querySelector('.map-inner');
		const mapObject = document.getElementById('tunisia-map-object');
		if (!inner || !mapObject) return;

		let isDown = false, startX = 0, startY = 0, startPanX = 0, startPanY = 0;

		function onMouseDown(e) {
			if (e.button !== 0) return;
			const api = window.__mapTransform;
			if (!api) return;
			const currentZoom = api.getZoom?.() || 1;
			if (currentZoom <= 1.05) return;

			isDown = true;
			inner.classList.add('is-panning');
			startX = e.clientX;
			startY = e.clientY;
			const pan = api.getPan?.() || { x: 0, y: 0 };
			startPanX = pan.x;
			startPanY = pan.y;

			window.addEventListener('mousemove', onMouseMove);
			window.addEventListener('mouseup', onMouseUp);
		}

		function onMouseMove(e) {
			if (!isDown) return;
			e.preventDefault();
			const dx = e.clientX - startX;
			const dy = e.clientY - startY;
			window.__mapTransform?.setPan(startPanX + dx, startPanY + dy);
		}

		function onMouseUp() {
			if (!isDown) return;
			isDown = false;
			inner.classList.remove('is-panning');
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
		}

		inner.addEventListener('mousedown', onMouseDown);
	}

	// ============== INIT ==============
	const obj = document.getElementById('tunisia-map-object');
	if (obj) {
		function initFromObject() {
			const svgDoc = obj.contentDocument;
			if (!svgDoc) return;
			const svgRoot = svgDoc.querySelector('svg');
			if (!svgRoot) return;
			addDjerbaHotspot(svgDoc, svgRoot);
			addTunisCapitalMarker(svgDoc, svgRoot);
			makeClickable(svgDoc, svgRoot);
		}

		if (obj.contentDocument?.querySelector('svg')) {
			initFromObject();
		} else {
			obj.addEventListener('load', initFromObject, { once: true });
		}
	}

	function init() {
		initTheme();
		setupRegionInfoPanel();
		setupZoomControls();
		setupPanInteraction();
		setupSearch();
		setupFavorites();
		setupShare();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();