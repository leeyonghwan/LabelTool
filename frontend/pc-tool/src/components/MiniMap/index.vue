<template>
    <!-- <div class="edit-class-common"> -->
    <div class="minimap-view" v-show="true">
        <div  ref="dom" style="height: 100%; width: 100%; psition: relative"></div>
        <CloseCircleOutlined v-show="showClose" @click="onClose" class="close" />
    </div>
</template>

<script setup lang="ts">

    import { onMounted, onBeforeUnmount, ref, reactive, computed } from 'vue';
    import { useInjectEditor, useInjectState } from '../../state';
    import {
        EyeOutlined,
        DeleteOutlined,
        CloseCircleOutlined,
        FileMarkdownOutlined,
        EyeInvisibleOutlined,
        CopyOutlined,
    } from '@ant-design/icons-vue';
    import * as _ from 'lodash';
    // import * as locale from './lang';
    // import { Const } from 'pc-editor';

    import useUI from '../../hook/useUI'; 
    import useEditClass from './useEditClass';
    import Editor from '../../common/Editor';
    import { MiniMapRenderView, Event } from 'pc-render';
    
    interface IProps {
        // option: IClassOption;
        showClose: boolean;
    }

    // ***************Props and Emits***************
    let props = defineProps<IProps>();
    // let emit = defineEmits(['close']);
    // let props = defineProps<IProps>();
    // *********************************************
   
    let container = ref(null as any as HTMLDivElement);
    let { canEdit } = useUI();
    let view = {} as MiniMapRenderView;
    let dom = ref<HTMLDivElement | null>(null);
    
    let editor = useInjectEditor();
    //let TState = useInjectState();
    let pc = editor.pc;
    
    
    onMounted(() => {
        
        if (dom.value) {
            view = new MiniMapRenderView(dom.value, pc, { name: 'minimapView' });
            pc.addRenderView(view);
        }
        view.addEventListener(Event.RENDER_AFTER, update);
       
    });
    onBeforeUnmount(() => {
        view.removeEventListener(Event.RENDER_AFTER, update);
    });

     function onClose() {
         // emit('close');
         control.close();
     }
    let {
        state,
        update,
        control,
        onAttChange,
        onClassChange,
        onInstanceRemove,
        onToggleObjectsVisible,
        onRemoveObjects,
        // onObjectStatusChange,
        onObjectInstanceRemove,
        copyAttrFrom,
        onToggleTrackVisible,
        // toggleStandard,
    } = useEditClass();

    defineExpose({
        update,
    });
</script>

<style lang="less">
    .minimap-view{
        position: relative;
        height: 100%;


        .close {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 20px;
        }

    }
</style>
