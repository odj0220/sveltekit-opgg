<script>
    export let tooltip = false // prevent blank tooltips
</script>

<section data-tooltip={tooltip}>
    <slot></slot>
</section>
