"""
Phase 3: Top page component class renames (index.html + _top.scss only).
Also handles JS selector updates in top.js and global.js.
"""
import re
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Top page component renames
RENAMES = [
    # Hero section
    ('carousel-img-container', 'p-top-hero__images'),
    ('carousel-container', 'p-top-hero'),
    ('hero-text-slider-container', 'p-top-hero__overlay'),
    ('hero-text__cta', 'p-top-hero__cta'),
    ('hero-text', 'p-top-hero__text'),
    ('hero-ribbon', 'p-top-hero__ribbon'),
    ('hero-slider-img', 'p-top-hero__slider-img'),
    ('mySlides', 'p-top-hero__slide'),
    ('dots-container', 'p-top-hero__dots'),
    ('dots', 'p-top-hero__dot'),

    # News section
    ('news-tabs-container', 'p-top-news__tabs'),
    ('news-banner-context--sp', 'p-top-news__banner-body--sp'),
    ('news-banner-context', 'p-top-news__banner-body'),
    ('news-banner__heading--sp', 'p-top-news__banner-heading--sp'),
    ('news-banner__heading', 'p-top-news__banner-heading'),
    ('news-banner-sticker1-sp', 'p-top-news__sticker1--sp'),
    ('news-banner-sticker2-sp', 'p-top-news__sticker2--sp'),
    ('news-banner-sticker3-sp', 'p-top-news__sticker3--sp'),
    ('news-banner-sticker4-sp', 'p-top-news__sticker4--sp'),
    ('news-banner-sticker1', 'p-top-news__sticker1'),
    ('news-banner-sticker2', 'p-top-news__sticker2'),
    ('news-banner-sticker3', 'p-top-news__sticker3'),
    ('news-banner-sticker4', 'p-top-news__sticker4'),
    ('news-banner-desk', 'p-top-news__banner--desk'),
    ('news-banner-sp', 'p-top-news__banner--sp'),
    ('news-banner-break', 'p-top-news__break'),
    ('news-banner', 'p-top-news__banner'),
    ('news-ribbon-desk2', 'p-top-news__ribbon-desk2'),
    ('news-ribbon-desk', 'p-top-news__ribbon-desk'),
    ('news-ribbon-sp2', 'p-top-news__ribbon-sp2'),
    ('news-ribbon-sp', 'p-top-news__ribbon-sp'),
    ('news-ribbon', 'p-top-news__ribbon'),
    ('news-30min-label', 'p-top-news__30min-label'),
    ('news-info-container', 'p-top-news__info'),
    ('news-label', 'p-top-news__label'),
    ('news-section', 'p-top-news'),

    # Service section
    ('service-section-title', 'p-top-service__title'),
    ('service-topic-container', 'p-top__service-topic'),
    ('service-container-sp', 'p-top-service__list--sp'),
    ('service-container', 'p-top-service__list'),
    ('service-img-wrapper', 'p-top-service__card-img'),
    ('service-content', 'p-top-service__card-body'),
    ('service-wrapper3', 'p-top-service__card--3'),
    ('service-wrapper2', 'p-top-service__card--2'),
    ('service-wrapper', 'p-top-service__card'),
    ('service-break', 'p-top-service__break'),
    ('service-ribbon', 'p-top-service__ribbon'),
    ('service-section', 'p-top-service'),

    # Topic section
    ('topic-buttons-container', 'p-top-topic__buttons'),
    ('topic-slider__buttons', 'p-top-topic__slider-btns'),
    ('topic-slider__dots', 'p-top-topic__slider-dots'),
    ('topic-slider__track', 'p-top-topic__slider-track'),
    ('topic-slider__dot', 'p-top-topic__slider-dot'),
    ('topic-sticker', 'p-top-topic__sticker'),
    ('topic-speech-bubble', 'p-top-topic__speech-bubble'),
    ('topic-section-header', 'p-top-topic__header'),
    ('topic-container', 'p-top-topic'),
    ('topic-bg', 'p-top-topic__bg'),
    ('topic-ribbon', 'p-top-topic__ribbon'),
    ('top-topic-sticker', 'p-top-topic__top-sticker'),
    ('topic-slider', 'p-top-topic__slider'),

    # Training machine section
    ('training-machine-slider__track', 'p-top-machine__slider-track'),
    ('training-machine-container', 'p-top-machine__inner'),
    ('training-machine-section', 'p-top-machine'),
    ('training-machine-label', 'p-top-machine__label'),
    ('machine-label-icon', 'p-top-machine__icon'),
    ('machine-label-p', 'p-top-machine__desc'),
    ('training-machine__info', 'p-top-machine__info'),

    # Shop/Training container
    ('shop-training-machine-container', 'p-top__shop-machine'),
    ('shop-break', 'p-top-shop__break'),

    # Dr. Amazones section
    ('dr-amazones-container', 'p-top-dr__container'),
    ('dr-amazones-section__inner', 'p-top-dr__inner'),
    ('dr-amazones-section__header', 'p-top-dr__header'),
    ('dr-amazones-section__body', 'p-top-dr__body'),
    ('dr-amazones-section', 'p-top-dr__section'),
    ('dr-amazones-label', 'p-top-dr__label'),
    ('dr-amazones-btn', 'p-top-dr__btn'),
    ('drAmazones-pic', 'p-top-dr__pic'),
    ('triangle-icon', 'p-top-dr__triangle'),

    # Voice section
    ('voice-section__inner', 'p-top-voice__inner'),
    ('voice-section__header', 'p-top-voice__header'),
    ('voice-section__sub-text__inner', 'p-top-voice__sub-inner'),
    ('voice-section__sub-text', 'p-top-voice__sub-text'),
    ('voice-section', 'p-top-voice'),
    ('voice-slide-content', 'p-top-voice__slide-content'),
    ('voice-slide', 'p-top-voice__slide'),
    ('voice-img-box', 'p-top-voice__img-box'),
    ('voice-label', 'p-top-voice__label'),
    ('voice-name', 'p-top-voice__name'),
    ('voice-btn', 'p-top-voice__btn'),

    # Movie section
    ('movie-section-container', 'p-top-movie__container'),
    ('movie-section__header', 'p-top-movie__header'),
    ('movie-section__info', 'p-top-movie__info'),
    ('movie-section__label-inner', 'p-top-movie__label-inner'),
    ('movie-section__thumbs', 'p-top-movie__thumbs'),
    ('movie-section', 'p-top-movie'),
    ('movie-ribbon-sp', 'p-top-movie__ribbon-sp'),
    ('movie-ribbon', 'p-top-movie__ribbon'),
    ('movie-video', 'p-top-movie__video'),
    ('movie-thumbnail', 'p-top-movie__thumbnail'),
    ('movie-sticker-container-sp', 'p-top-movie__sticker-sp'),
    ('movie-sticker-container', 'p-top-movie__sticker'),
    ('movie-sticker-girl', 'p-top-movie__sticker-girl'),
    ('movie-sticker1', 'p-top-movie__sticker1'),
    ('movie-sticker2', 'p-top-movie__sticker2'),
    ('movie-sticker-sp1', 'p-top-movie__sticker-sp1'),
    ('movie-sticker-sp2', 'p-top-movie__sticker-sp2'),
    ('movie-speech-bubble', 'p-top-movie__speech-bubble'),
    ('movie-label-break', 'p-top-movie__label-break'),
    ('min1-logo', 'p-top-movie__min1-logo'),
    ('myWrapper', 'p-top-movie__wrapper'),

    # Recruit section
    ('recruit-banner-section', 'p-top-recruit'),
    ('recruit-banner-track2', 'p-top-recruit__track2'),
    ('recruit-banner-track', 'p-top-recruit__track'),
    ('recruit-banner', 'p-top-recruit__banner'),
    ('recruit-info__content', 'p-top-recruit__content'),
    ('recruit-info', 'p-top-recruit__info'),
    ('recruit-img', 'p-top-recruit__img'),

    # Text slider (reusable component)
    ('text-slider', 'c-text-marquee'),
    ('slide-track', 'c-text-marquee__track'),

    # Ribbon scroll (reusable)
    ('ribbon-scroll-container', 'c-ribbon-scroll'),
]

# Sort by old class length (longest first)
RENAMES.sort(key=lambda x: len(x[0]), reverse=True)


def rename_in_html(content, old_class, new_class):
    def replacer(match):
        quote = match.group(1)
        classes = match.group(2)
        new_classes = re.sub(
            r'(?<![a-zA-Z0-9_-])' + re.escape(old_class) + r'(?![a-zA-Z0-9_-])',
            new_class, classes)
        return f'class={quote}{new_classes}{quote}'
    return re.sub(r'''class=([\"'])(.*?)\1''', replacer, content, flags=re.DOTALL)


def rename_in_scss(content, old_class, new_class):
    return re.sub(
        r'\.' + re.escape(old_class) + r'(?=[^a-zA-Z0-9_-]|$)',
        '.' + new_class, content)


def rename_in_js_safe(content, old_class, new_class):
    """Rename class references in JS, but NOT getElementById strings."""
    # querySelector/querySelectorAll with dot prefix
    content = re.sub(
        r'(querySelector(?:All)?\s*\(\s*["\'])\.(' + re.escape(old_class) + r')(?=["\'\s,#\[>\+~:])',
        lambda m: m.group(1) + '.' + new_class,
        content)
    # classList.add/remove/toggle/contains
    content = re.sub(
        r'(classList\.(?:add|remove|toggle|contains)\s*\(\s*["\'])(' + re.escape(old_class) + r')(["\'])',
        lambda m: m.group(1) + new_class + m.group(3),
        content)
    return content


def run():
    print("=" * 60)
    print("Phase 3: Top page component class renames")
    print("=" * 60)
    print(f"Renaming {len(RENAMES)} class pairs")

    # Files to process
    top_html = os.path.join(BASE_DIR, 'index.html')
    top_scss = os.path.join(BASE_DIR, 'assets', 'scss', '_top.scss')
    global_scss = os.path.join(BASE_DIR, 'assets', 'scss', '_global.scss')
    top_js = os.path.join(BASE_DIR, 'assets', 'js', 'top.js')
    global_js = os.path.join(BASE_DIR, 'assets', 'js', 'global.js')

    for filepath in [top_html]:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        original = content
        for old, new in RENAMES:
            content = rename_in_html(content, old, new)
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  Updated HTML: {os.path.relpath(filepath, BASE_DIR)}")

    for filepath in [top_scss, global_scss]:
        if not os.path.exists(filepath):
            continue
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        original = content
        for old, new in RENAMES:
            content = rename_in_scss(content, old, new)
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  Updated SCSS: {os.path.relpath(filepath, BASE_DIR)}")

    for filepath in [top_js, global_js]:
        if not os.path.exists(filepath):
            continue
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        original = content
        for old, new in RENAMES:
            content = rename_in_js_safe(content, old, new)
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  Updated JS: {os.path.relpath(filepath, BASE_DIR)}")

    print("\nPhase 3 complete!")


if __name__ == '__main__':
    run()
